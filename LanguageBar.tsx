import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe } from 'lucide-react';

interface LanguageBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageBar: React.FC<LanguageBarProps> = ({ currentLang, onLanguageChange }) => {
  const t = translations[currentLang];
  
  const langOptions: { id: Language; label: string }[] = [
    { id: 'ko', label: '한국어 (KO)' },
    { id: 'en', label: 'English (EN)' },
    { id: 'zh-CN', label: '中文(简体) (ZH-CN)' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50 shadow-sm transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Left: Current Language Indicator */}
        <div className="flex items-center gap-2 text-indigo-900/70 text-sm font-medium">
          <Globe className="w-4 h-4 text-indigo-500" />
          <span>
            {t.currentLanguage}: <span className="text-indigo-700 font-bold ml-1">{currentLang.toUpperCase()}</span>
          </span>
        </div>

        {/* Right: Language Selector */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.selectableLanguages}
          </span>
          <div className="flex p-1 bg-slate-100 rounded-full">
            {langOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => onLanguageChange(opt.id)}
                className={`
                  px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out
                  ${currentLang === opt.id 
                    ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5 scale-100' 
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-white/50'
                  }
                `}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LanguageBar;