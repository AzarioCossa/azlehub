import React from 'react';
import { FileUp, Trash2, Layers } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { usePDFMerger } from './hooks/usePDFMerger';

export const PDFMergerTool: React.FC = () => {
  const { files, isMerging, addFiles, removeFile, handleMerge } = usePDFMerger();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card title="PDF Merger" description="Junte múltiplos ficheiros PDF num só, diretamente no seu navegador. 100% privado.">
        <div className="space-y-6">
          
          {/* Upload Zone */}
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-10 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept=".pdf"
              onChange={(e) => addFiles(e.target.files)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Clique para adicionar PDFs"
            />
            <div className="flex flex-col items-center pointer-events-none">
              <FileUp className="h-10 w-10 text-blue-500 mb-4" />
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                Clique ou arraste os seus PDFs para aqui
              </p>
              <p className="text-sm text-slate-500 mt-2">Apenas ficheiros .pdf são suportados</p>
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Ficheiros Selecionados ({files.length}):</h4>
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                    <span className="text-sm truncate font-medium text-slate-700 dark:text-slate-300">
                      {index + 1}. {file.name}
                    </span>
                    <button 
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Remover ficheiro"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button 
              onClick={handleMerge} 
              disabled={files.length < 2 || isMerging} 
              className="w-full"
              icon={Layers}
            >
              {isMerging ? 'A processar...' : 'Juntar PDFs'}
            </Button>
            {files.length > 0 && files.length < 2 && (
              <p className="text-xs text-center text-amber-600 mt-2">Adicione pelo menos 2 ficheiros para juntar.</p>
            )}
          </div>

        </div>
      </Card>
    </div>
  );
};