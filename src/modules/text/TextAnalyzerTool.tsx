import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTextTool } from './hooks/useTextTool';

export const TextAnalyzerTool: React.FC = () => {
  const { text, setText, stats, slug } = useTextTool();

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2">
        <Card title="Entrada de Texto" description="Digite ou cole seu texto abaixo para analisar.">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva algo incrível aqui..."
            className="w-full h-64 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-sans transition-all"
          />
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Estatísticas">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Caracteres</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.chars}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Palavras</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.words}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Linhas</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lines}</span>
            </div>
          </div>
        </Card>
        
        <Card title="Slug URL Friendly">
          <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded text-sm font-mono text-slate-600 dark:text-slate-300 break-all border border-slate-200 dark:border-slate-700">
            {slug || "..."}
          </div>
        </Card>
      </div>
    </div>
  );
};
