import React from 'react';
import { ArrowRight } from 'lucide-react';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';

interface DashboardProps {
  onNavigate: (toolId: string) => void;
}

export const DashboardHome: React.FC<DashboardProps> = ({ onNavigate }) => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
        Bem-vindo ao <span className="text-blue-600">AzleHub</span>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400">
        Sua central pessoal de desenvolvimento. Arquitetura modular e código limpo.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TOOLS_REGISTRY.map(tool => (
        <div 
          key={tool.id} 
          onClick={() => onNavigate(tool.id)}
          className="group cursor-pointer bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transform group-hover:scale-110 transition-all">
            <tool.icon size={64} className="text-blue-600" />
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <tool.icon size={24} />
          </div>
          
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            {tool.description}
          </p>
          
          <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
            Abrir Ferramenta <ArrowRight size={16} className="ml-1" />
          </div>
        </div>
      ))}
    </div>
  </div>
);