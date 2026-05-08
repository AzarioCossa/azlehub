import React from 'react';
import { Key, AlertTriangle, ShieldCheck, Clock, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useJWTDecoder } from './hooks/useJWTDecoder';
import { useLanguage } from '@/contexts/LanguageContext'; // <-- Importação do Hook

export const JWTDecoderTool: React.FC = () => {
  const { t } = useLanguage(); // <-- Inicialização do Hook
  const { token, setToken, decoded, clear } = useJWTDecoder();

  const formatJSON = (obj: any) => JSON.stringify(obj, null, 2);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card 
        title={t('tool_jwt-decoder_name' as any)} 
        description={t('tool_jwt-decoder_desc' as any)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Key size={16} className="text-amber-500" />
                {t('jwt_original' as any)}
              </label>
              {token && (
                <button onClick={clear} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
                  <Trash2 size={14} /> {t('clear')}
                </button>
              )}
            </div>
            
            <textarea
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={t('jwt_placeholder')}
              className="w-full h-[400px] p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none font-mono text-sm break-all text-slate-700 dark:text-slate-300 leading-relaxed shadow-inner"
            />
          </div>

          <div className="space-y-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-800 lg:pl-8">
            {!decoded ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 min-h-[300px]">
                <Key size={48} className="opacity-20" />
                <p className="text-sm font-medium">{t('jwt_waiting' as any)}</p>
              </div>
            ) : !decoded.isValid ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 p-4 rounded-xl text-red-600 dark:text-red-400 flex items-start gap-3">
                <AlertTriangle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">
                  {/* Se o erro for genérico, usamos a nossa tradução, senão deixamos o erro específico da biblioteca */}
                  {decoded.error === 'Invalid token' ? t('jwt_invalid') : decoded.error}
                </p>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                
                {/* Status Card (Expiração) */}
                <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                  decoded.isExpired 
                    ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
                    : 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400'
                }`}>
                  {decoded.isExpired ? <Clock size={20} /> : <ShieldCheck size={20} />}
                  <div>
                    <p className="text-sm font-bold">
                      {decoded.isExpired ? t('jwt_expired' as any) : t('jwt_active' as any)}
                    </p>
                    {decoded.payload?.exp && (
                      <p className="text-xs opacity-80 mt-0.5">
                        {t('jwt_expires_at' as any)} {new Date(decoded.payload.exp * 1000).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider mb-2">
                    {t('jwt_header')} <span className="text-slate-400 normal-case font-normal">{t('jwt_header_subtitle' as any)}</span>
                  </h4>
                  <pre className="bg-slate-800 text-rose-300 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
                    <code>{formatJSON(decoded.header)}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2">
                    {t('jwt_payload')} <span className="text-slate-400 normal-case font-normal">{t('jwt_payload_subtitle' as any)}</span>
                  </h4>
                  <pre className="bg-slate-800 text-purple-300 p-4 rounded-xl font-mono text-sm overflow-x-auto shadow-inner">
                    <code>{formatJSON(decoded.payload)}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">
                    {t('jwt_signature')} <span className="text-slate-400 normal-case font-normal">{t('jwt_signature_subtitle' as any)}</span>
                  </h4>
                  <div className="bg-slate-800 p-4 rounded-xl shadow-inner">
                    <p className="text-blue-300 font-mono text-xs break-all">
                      {decoded.signature}
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};