import React, { useState } from 'react';
import { ArrowRight, Search, Wrench } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';
import { useLanguage } from '@/contexts/LanguageContext';

interface DashboardProps {
  onNavigate: (toolId: string) => void;
}

export const DashboardHome: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const translatedTools = TOOLS_REGISTRY.map(tool => ({
    ...tool,
    name: t(`tool_${tool.id}_name` as any) || tool.name,
    description: t(`tool_${tool.id}_desc` as any) || tool.description
  }));

  const filteredTools = translatedTools.filter((tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
          {t('welcome')} <span className="text-blue-600">AzleHub</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          {t('subtitle')}
        </p>
      </div>

      {/* Barra de Pesquisa */}
      <div className="relative max-w-xl mx-auto group mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 text-slate-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100 transition-all"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-medium text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {t('clear')}
          </button>
        )}
      </div>

      {/* Grelha de Ferramentas ou Estado Vazio */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id} 
              onClick={() => onNavigate(tool.id)}
              className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              {/* Ícone de fundo gigante (Watermark) */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transform group-hover:scale-125 transition-all duration-500 pointer-events-none">
                <tool.icon size={100} className="text-slate-900 dark:text-white" />
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <tool.icon size={24} />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors relative z-10">
                {tool.name}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 flex-grow relative z-10">
                {tool.description}
              </p>
              
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                {t('openTool')} <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 animate-in zoom-in-95 duration-300">
          <div className="bg-slate-50 dark:bg-slate-800/50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200 dark:border-slate-700">
            <Wrench className="h-10 w-10 text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {t('noResults')}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {t('noResultsDesc')} "<span className="font-medium text-slate-700 dark:text-slate-300">{searchQuery}</span>".
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-6 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg transition-colors"
          >
            {t('clearSearch')}
          </button>
        </div>
      )}
    </div>
  );
};