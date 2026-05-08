import React, { useState } from 'react';
import { Terminal, Copy, Check, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useChmodCalculator } from './hooks/useChmodCalculator';
import { useLanguage } from '@/contexts/LanguageContext';

export const ChmodCalculatorTool: React.FC = () => {
  const { t } = useLanguage();
  const { state, octalInput, symbolic, togglePermission, handleOctalChange, copyCommand } = useChmodCalculator();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyCommand(`chmod ${octalInput} file.txt`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const entities = [
    { id: 'owner', label: t('chmod_owner' as any), color: 'text-blue-600 dark:text-blue-400' },
    { id: 'group', label: t('chmod_group' as any), color: 'text-emerald-600 dark:text-emerald-400' },
    { id: 'public', label: t('chmod_public' as any), color: 'text-purple-600 dark:text-purple-400' }
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card 
        title={t('tool_chmod-calculator_name' as any)} 
        description={t('tool_chmod-calculator_desc' as any)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="space-y-6">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Shield size={18}/> {t('chmod_matrix' as any)}
            </h4>
            
            <div className="grid grid-cols-3 gap-4">
              {entities.map(entity => (
                <div key={entity.id} className="space-y-3">
                  <div className={`font-semibold text-sm border-b border-slate-200 dark:border-slate-800 pb-2 ${entity.color}`}>
                    {entity.label}
                  </div>
                  
                  {(['read', 'write', 'execute'] as const).map(perm => (
                    <label key={perm} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={state[entity.id as keyof typeof state][perm]}
                        onChange={() => togglePermission(entity.id as any, perm)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors capitalize">
                        {t(`chmod_${perm}` as any)} <span className="text-xs text-slate-400">({perm === 'read' ? 'r' : perm === 'write' ? 'w' : 'x'})</span>
                      </span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 md:border-l md:border-slate-200 dark:md:border-slate-800 md:pl-8">

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('chmod_octal' as any)}
              </label>
              <input 
                type="text" 
                value={octalInput}
                onChange={(e) => handleOctalChange(e.target.value)}
                maxLength={3}
                className="w-full text-4xl font-mono p-4 text-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100 tracking-[0.5em]"
              />
              <p className="text-xs text-center text-slate-500 mt-2">{t('chmod_octal_hint' as any)}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{t('chmod_symbolic' as any)}</span>
              <span className="text-lg font-mono font-bold text-slate-800 dark:text-slate-200">{symbolic}</span>
            </div>

            <div className="pt-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                <Terminal size={16}/> {t('chmod_command' as any)}
              </label>
              <div className="flex relative">
                <code className="flex-1 bg-slate-800 text-green-400 p-4 rounded-l-lg font-mono text-sm border border-slate-700">
                  chmod {octalInput.length === 3 ? octalInput : '000'} file.txt
                </code>
                <Button 
                  onClick={handleCopy}
                  className="rounded-l-none"
                  icon={copied ? Check : Copy}
                >
                  {copied ? t('copied') : t('copy')}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </Card>
    </div>
  );
};