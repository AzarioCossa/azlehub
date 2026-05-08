import React from 'react';
import { Image as ImageIcon, Download, Settings, Trash2, Zap } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useImageConverter } from './hooks/useImageConverter';
import { useLanguage } from '@/contexts/LanguageContext';

export const ImageConverterTool: React.FC = () => {
    const { t } = useLanguage();
    const { 
        file, previewUrl, isProcessing, resultBlob, 
        options, setOptions, handleFileSelect, clear, 
        processImage, download, formatBytes 
    } = useImageConverter();

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        <Card 
            title={t('tool_image-converter_name' as any) || "Conversor de Imagens"} 
            description={t('tool_image-converter_desc' as any) || "Converta imagens no seu navegador."}
        >
            <div className="space-y-8">

            {!file ? (
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-12 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative">
                <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center pointer-events-none">
                    <ImageIcon className="h-12 w-12 text-blue-500 mb-4" />
                    <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                    {t('image_drag_drop')}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">{t('image_supports')}</p>
                </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('image_original')}</h4>
                    <button onClick={clear} className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                        <Trash2 size={14} /> {t('image_change')}
                    </button>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800 flex justify-center">
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" className="max-h-64 object-contain rounded" />
                    )}
                    </div>
                    <p className="text-sm text-center text-slate-500">
                    {t('image_size')} <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{formatBytes(file.size)}</span>
                    </p>
                </div>

                <div className="space-y-6">

                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-5">
                    <div className="flex items-center gap-2 mb-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                        <Settings size={18} className="text-blue-500" />
                        <h4 className="font-medium text-slate-800 dark:text-slate-200">{t('image_settings')}</h4>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-2">{t('image_output_format')}</label>
                        <div className="flex gap-2">
                        {['image/webp', 'image/jpeg', 'image/png'].map(fmt => (
                            <button
                            key={fmt}
                            onClick={() => setOptions({ ...options, format: fmt as any })}
                            className={`flex-1 py-2 text-xs font-semibold rounded border transition-colors ${
                                options.format === fmt 
                                ? 'bg-blue-500 text-white border-blue-500' 
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                            >
                            {fmt.split('/')[1].toUpperCase()}
                            </button>
                        ))}
                        </div>
                    </div>

                    {options.format !== 'image/png' && (
                        <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('image_compression')}</label>
                            <span className="text-xs font-mono bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                            {Math.round(options.quality * 100)}%
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="0.1" max="1" step="0.1" 
                            value={options.quality}
                            onChange={(e) => setOptions({...options, quality: parseFloat(e.target.value)})}
                            className="w-full accent-blue-500"
                        />
                        <p className="text-xs text-slate-500 mt-1">{t('image_quality_hint')}</p>
                        </div>
                    )}

                    <Button 
                        onClick={processImage} 
                        disabled={isProcessing}
                        className="w-full"
                        icon={Zap}
                    >
                        {isProcessing ? t('image_processing') : t('image_optimize_btn')}
                    </Button>
                    </div>

                    {resultBlob && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5 text-center space-y-4 animate-in slide-in-from-bottom-4">
                        <div>
                        <p className="text-sm text-green-800 dark:text-green-300 font-medium">{t('image_new_size')}</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono mt-1">
                            {formatBytes(resultBlob.size)}
                        </p>

                        {file.size > resultBlob.size && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 bg-green-100 dark:bg-green-900/40 inline-block px-2 py-0.5 rounded-full">
                            {t('image_savings')} {Math.round((1 - (resultBlob.size / file.size)) * 100)}%
                            </p>
                        )}
                        </div>
                        
                        <Button onClick={download} className="w-full bg-green-600 hover:bg-green-700 text-white" icon={Download}>
                        {t('download')}
                        </Button>
                    </div>
                    )}
                </div>
                </div>
            )}

            </div>
        </Card>
        </div>
    );
};