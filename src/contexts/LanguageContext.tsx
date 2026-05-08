"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['PT']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Começa com PT, mas será substituído pelo valor do localStorage se existir
  const [language, setLanguageState] = useState<Language>('PT');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('azlehub-lang') as Language;
    if (savedLang && ['PT', 'EN', 'FR'].includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('azlehub-lang', lang);
  };

  // A função mágica 't' que vai traduzir as nossas strings
  const t = (key: keyof typeof translations['PT']) => {
    return translations[language][key] || translations['PT'][key]; // Fallback para PT
  };

  if (!mounted) {
    // Evita erros de hidratação e mostra a UI apenas quando o idioma está definido
    return <div className="min-h-screen bg-white dark:bg-slate-950" />; 
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  return context;
};