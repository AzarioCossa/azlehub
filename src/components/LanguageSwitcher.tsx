"use client";

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/i18n/translations';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const cycleLanguage = () => {
    const next: Record<Language, Language> = { PT: 'EN', EN: 'FR', FR: 'PT' };
    setLanguage(next[language]);
  };

  return (
    <button
      onClick={cycleLanguage}
      className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-medium text-sm"
      title="Trocar idioma"
    >
      <Globe size={18} />
      <span className="w-5 text-center">{language}</span>
    </button>
  );
};