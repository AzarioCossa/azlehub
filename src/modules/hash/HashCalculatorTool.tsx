import React from 'react';
import { Hash, Copy, Check, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useHashCalculator } from './hooks/useHashCalculator';
import { useLanguage } from '@/contexts/LanguageContext';

export const HashCalculatorTool: React.FC = () => {
  const { t } = useLanguage();
  const { input, setInput, hashes, copyToClipboard, copiedAlg, clear } = useHashCalculator();

  const algorithmList = [
    { id: 'sha256', name: 'SHA-256', value: hashes.sha256, color: 'text-blue-500' },
    { id: 'sha512', name: 'SHA-512', value: hashes.sha512, color: 'text-purple-500' },
    { id: 'md5', name: 'MD5', value: hashes.md5, color: 'text-amber-500' },
    { id: 'sha1', name: 'SHA-1', value: hashes.sha1, color: 'text-emerald-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card 
        title={t('tool_hash-calculator_name' as any)} 
        description={t('tool_hash-calculator_desc' as any)}
      >
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Hash size={16} className="text-blue-500" />
                {t('hash_input_label' as any)}
              </label>
              {input && (
                <button onClick={clear} className="text-xs text-red-500 hover:underline flex items-center gap-1 transition-colors">
                  <Trash2 size={12} /> {t('clear')}
                </button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('hash_placeholder' as any)}
              className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-sans text-slate-900 dark:text-slate-100 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-8">
            {algorithmList.map((alg) => (
              <div key={alg.id} className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-all hover:border-blue-500/50 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-xs font-bold uppercase tracking-widest ${alg.color}`}>
                    {alg.name}
                  </span>
                  <button 
                    onClick={() => copyToClipboard(alg.value, alg.id)}
                    className="text-slate-400 hover:text-blue-500 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                    title={t('copy')}
                  >
                    {copiedAlg === alg.id ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>
                <p className="font-mono text-sm break-all text-slate-600 dark:text-slate-400 leading-relaxed">
                  {input ? alg.value : '...'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};