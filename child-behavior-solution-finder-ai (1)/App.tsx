import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultView from './components/ResultView';
import Modal from './components/Modal';
import LanguageSelector from './components/LanguageSelector';
import { analyzeBehavior, getABAInfo } from './services/geminiService';
import { UserInput, AnalysisResult, Language } from './types';
import { translations } from './translations';
import { Heart } from 'lucide-react';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ko');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [abaInfoContent, setAbaInfoContent] = useState<string>('');
  const [isModalLoading, setIsModalLoading] = useState(false);

  const t = translations[language];

  // Update document title based on language
  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  // Load result from local storage on mount
  useEffect(() => {
    const savedResult = localStorage.getItem('cbsf_analysis_result');
    if (savedResult) {
      try {
        setResult(JSON.parse(savedResult));
      } catch (e) {
        console.error("Failed to parse saved result", e);
      }
    }
  }, []);

  // Save result to local storage whenever it changes
  useEffect(() => {
    if (result) {
      localStorage.setItem('cbsf_analysis_result', JSON.stringify(result));
    }
  }, [result]);

  const handleAnalyze = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeBehavior(input, language);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("정말 초기화 하시겠습니까? 저장된 분석 결과가 삭제됩니다.\nAre you sure? Saved results will be cleared.")) {
      setResult(null);
      setError(null);
      localStorage.removeItem('cbsf_analysis_result');
      // We don't clear user inputs (cbsf_user_input) so they can easily edit/retry
    }
  };

  const toggleLanguage = (lang: Language) => {
    setLanguage(lang);
    // Note: We don't reset results on language change, but the result content 
    // itself is in the generated language. The UI will change, but the content won't translation instantly.
    // This is acceptable behavior.
    
    // Close modal if language changes to avoid stale content
    setIsModalOpen(false);
    setAbaInfoContent('');
  };

  const handleABAClick = async () => {
    setIsModalOpen(true);
    if (!abaInfoContent) {
      setIsModalLoading(true);
      try {
        const info = await getABAInfo(language);
        setAbaInfoContent(info);
      } catch (err) {
        setAbaInfoContent("Failed to load information. Please try again.");
      } finally {
        setIsModalLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Optional: Clear content if we want to re-fetch on next open or keep cache
    // setAbaInfoContent(''); 
  };

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 flex flex-col font-sans">
      
      {/* Header - Sticky */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all duration-300 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-sm">
              <Heart className="text-white w-5 h-5" />
            </div>
            {/* Unified title for all screen sizes */}
            <h1 className="text-xl font-bold text-indigo-900 tracking-tight">{t.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:block text-sm font-medium text-slate-500 border-r border-slate-200 pr-4">
               {t.subtitle}
             </div>
             <LanguageSelector currentLang={language} onLanguageChange={toggleLanguage} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex-grow w-full print:py-0 print:max-w-full">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center animate-pulse print:hidden">
            {error}
          </div>
        )}

        {!result ? (
          <div className="animate-fade-in-up">
            <InputForm 
              onSubmit={handleAnalyze} 
              isLoading={isLoading} 
              language={language} 
              onABAClick={handleABAClick}
            />
            
            {!isLoading && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto print:hidden">
                {t.features.map((feature, idx) => (
                  <div key={idx} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-50 hover:-translate-y-1">
                    <div className="text-4xl mb-4 bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">{['🔍', '🌱', '🤝'][idx]}</div>
                    <h3 className="font-bold text-slate-800 mb-2 text-lg">{feature.title}</h3>
                    <p className="text-sm text-slate-500 whitespace-pre-line leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <ResultView result={result} onReset={handleReset} language={language} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 mt-12 print:hidden">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© 2024 Child Behavior Solution Finder AI. Powered by Gemini.</p>
          <p className="mt-2">{t.disclaimer}</p>
        </div>
      </footer>

      {/* ABA Info Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="ABA Info"
      >
        {isModalLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-500 text-sm">Loading info...</p>
          </div>
        ) : (
          <div className="prose prose-sm md:prose-base text-slate-700 whitespace-pre-line leading-relaxed">
            {abaInfoContent}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;