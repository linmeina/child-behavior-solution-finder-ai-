import React, { useState, useEffect } from 'react';
import { UserInput, Language } from '../types';
import { translations } from '../translations';
import { Sparkles, ArrowRight, Save } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
  language: Language;
  onABAClick: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading, language, onABAClick }) => {
  const [age, setAge] = useState('');
  const [behavior, setBehavior] = useState('');
  const [context, setContext] = useState('');
  const [isAutoSaved, setIsAutoSaved] = useState(false);
  const t = translations[language];

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cbsf_user_input');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setAge(parsed.age || '');
        setBehavior(parsed.behavior || '');
        setContext(parsed.context || '');
      } catch (e) {
        console.error("Failed to parse saved inputs", e);
      }
    }
  }, []);

  // Save to localStorage whenever inputs change
  useEffect(() => {
    const data = { age, behavior, context };
    localStorage.setItem('cbsf_user_input', JSON.stringify(data));
    
    // Visual cue for auto-save
    if (age || behavior || context) {
      setIsAutoSaved(true);
      const timer = setTimeout(() => setIsAutoSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [age, behavior, context]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (age.trim() && behavior.trim() && context.trim()) {
      onSubmit({ age, behavior, context });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 relative">
        {/* Auto-save indicator */}
        <div className={`absolute top-4 right-4 text-xs text-indigo-400 flex items-center gap-1 transition-opacity duration-500 ${isAutoSaved ? 'opacity-100' : 'opacity-0'}`}>
          <Save className="w-3 h-3" />
          {t.autoSaved}
        </div>

        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-indigo-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{t.inputTitle}</h2>
          <p className="text-slate-500 mt-2 whitespace-pre-line leading-relaxed">
            {t.inputDescPre}
            <button 
              type="button"
              onClick={onABAClick}
              className="font-bold text-indigo-600 underline hover:text-indigo-800 transition-colors mx-1 focus:outline-none"
            >
              {t.inputDescLink}
            </button>
            {t.inputDescPost}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t.labelAge}
            </label>
            <input
              type="text"
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none bg-slate-50"
              placeholder={t.placeholderAge}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t.labelBehavior}
            </label>
            <textarea
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none bg-slate-50"
              rows={3}
              placeholder={t.placeholderBehavior}
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {t.labelContext}
            </label>
            <textarea
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none bg-slate-50"
              rows={3}
              placeholder={t.placeholderContext}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !age || !behavior || !context}
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
              isLoading || !age || !behavior || !context
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white shadow-lg hover:shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {t.analyzing}
              </>
            ) : (
              <>
                {t.submit} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
        
        <p className="text-xs text-center text-slate-400 mt-6">
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
};

export default InputForm;