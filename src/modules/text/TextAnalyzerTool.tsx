import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTextTool } from './hooks/useTextTool';
import { useLanguage } from '@/contexts/LanguageContext';

export const TextAnalyzerTool: React.FC = () => {
  const { t } = useLanguage();
  const { text, setText, stats, slug } = useTextTool();

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2">
        <Card 
          title={t('text_input_title' as any)} 
          description={t('text_input_desc' as any)}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('text_placeholder' as any)}
            className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-sans transition-all"
          />
        </Card>
      </div>

      <div className="space-y-6">
        <Card title={t('text_stats_title' as any)}>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">{t('text_chars' as any)}</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.chars}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">{t('text_words' as any)}</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.words}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">{t('text_lines' as any)}</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lines}</span>
            </div>
          </div>
        </Card>
        
        <Card title={t('text_slug_title' as any)}>
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-sm font-mono text-slate-600 dark:text-slate-300 break-all border border-slate-200 dark:border-slate-700">
            {slug || "..."}
          </div>
        </Card>
      </div>
    </div>
  );
};