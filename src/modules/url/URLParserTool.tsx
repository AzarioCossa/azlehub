import React from 'react';
import { Link2, Trash2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useURLParser } from './hooks/useURLParser';
import { useLanguage } from '@/contexts/LanguageContext';

export const URLParserTool: React.FC = () => {
  const { t } = useLanguage();
  const { inputUrl, setInputUrl, parsedData, clear } = useURLParser();

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card 
        title={t('tool_url-parser_name' as any)} 
        description={t('tool_url-parser_desc' as any)}
      >
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('url_full' as any)}
              </label>
              {inputUrl && (
                <button onClick={clear} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                  <Trash2 size={12} /> {t('clear')}
                </button>
              )}
            </div>
            <textarea
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={t('url_placeholder' as any)}
              className="w-full h-24 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm break-all text-slate-900 dark:text-slate-100"
            />
          </div>

          {inputUrl && parsedData && (
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              {!parsedData.isValid ? (
                <div className="flex items-center gap-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <AlertCircle size={20} />
                  <span className="text-sm">{t('url_invalid' as any)}</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t('url_protocol')}</span>
                      <p className="font-mono mt-1 text-slate-800 dark:text-slate-200">{parsedData.protocol}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t('url_host')}</span>
                      <p className="font-mono mt-1 text-slate-800 dark:text-slate-200">{parsedData.host}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t('url_path')}</span>
                      <p className="font-mono mt-1 text-slate-800 dark:text-slate-200">{parsedData.pathname || '/'}</p>
                    </div>
                  </div>

                  {parsedData.params.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        {t('url_params')} ({parsedData.params.length})
                      </h4>
                      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400">
                            <tr>
                              <th className="px-4 py-3 font-medium border-b border-slate-200 dark:border-slate-700 w-1/3">{t('url_param_key' as any)}</th>
                              <th className="px-4 py-3 font-medium border-b border-slate-200 dark:border-slate-700">{t('url_param_value' as any)}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {parsedData.params.map((param, index) => (
                              <tr key={index} className="border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                                <td className="px-4 py-3 font-mono text-slate-700 dark:text-slate-300">
                                  {param.key}
                                </td>
                                <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400 break-all">
                                  {param.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};