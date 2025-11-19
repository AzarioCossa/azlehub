import React from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useUUIDGenerator } from './hooks/useUUIDGenerator';

export const UUIDGeneratorTool: React.FC = () => {
  const { uuid, history, generate, copyToClipboard, copied } = useUUIDGenerator();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card title="Gerador de Identificador Único" description="Gera UUIDs versão 4 compatíveis com RFC 4122.">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
          <div className="relative w-full">
            <input 
              readOnly 
              value={uuid} 
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono text-lg rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="absolute right-2 top-2">
              <Button variant="ghost" onClick={copyToClipboard} className="h-8 w-8 p-0">
                 {copied ? <Check className="text-green-500" size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>
          <Button onClick={generate} icon={RefreshCw} className="w-full sm:w-auto whitespace-nowrap">
            Gerar Novo
          </Button>
        </div>

        {history.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Recentes</p>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-mono rounded-full border border-slate-200 dark:border-slate-600 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-200 transition-colors"
                  onClick={() => navigator.clipboard.writeText(h)}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
