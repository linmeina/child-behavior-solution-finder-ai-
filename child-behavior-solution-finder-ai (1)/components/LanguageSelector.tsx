import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = translations[currentLang];

  const langOptions: { id: Language; label: string }[] = [
    { id: 'ko', label: '한국어' },
    { id: 'en', label: 'English' },
    { id: 'zh-CN', label: '中文 (简体)' }
  ];

  const currentLabel = langOptions.find(opt => opt.id === currentLang)?.label;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (lang: Language) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200
          ${isOpen ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
        `}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLabel}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-fade-in origin-top-right">
          <div className="px-4 py-2 border-b border-slate-50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {t.selectableLanguages}
          </div>
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-indigo-50 transition-colors group"
            >
              <span className={`font-medium ${currentLang === opt.id ? 'text-indigo-600' : 'text-slate-700 group-hover:text-indigo-700'}`}>
                {opt.label}
              </span>
              {currentLang === opt.id && (
                <Check className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;