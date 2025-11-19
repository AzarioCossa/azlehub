import React, { useState, useEffect } from 'react';
import { Terminal, LayoutDashboard, Moon, Sun, Menu, X, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOOLS_REGISTRY } from '@/config/toolsRegistry';

interface MainLayoutProps {
  children: React.ReactNode;
  activeToolId: string | null;
  onNavigate: (id: string | null) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeToolId, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Lógica de Tema Escuro
  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleNav = (id: string | null) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeToolName = activeToolId ? TOOLS_REGISTRY.find(t => t.id === activeToolId)?.name : null;

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans flex ${isDarkMode ? 'dark' : ''}`}>
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Terminal size={20} />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">AzleHub</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <button
            onClick={() => handleNav(null)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeToolId === null 
                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
            )}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Ferramentas
          </div>

          {TOOLS_REGISTRY.map(tool => (
            <button
              key={tool.id}
              onClick={() => handleNav(tool.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeToolId === tool.id
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                  : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              <tool.icon size={18} />
              {tool.name}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex justify-between items-center">
             <span className="text-xs text-slate-500">v1.0.0</span>
             <Github size={16} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2" onClick={() => handleNav(null)}>
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <Terminal size={20} />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">AzleHub</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 dark:text-slate-300">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Conteúdo Principal */}
      <main className={cn("flex-1 min-h-screen transition-all duration-300 md:ml-64 pt-20 md:pt-8 px-4 md:px-8 pb-12")}>
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <span onClick={() => handleNav(null)} className="cursor-pointer hover:text-blue-600 hover:underline">
              Hub
            </span>
            {activeToolName && (
              <>
                <span className="mx-2">/</span>
                <span className="font-medium text-slate-900 dark:text-slate-200">{activeToolName}</span>
              </>
            )}
          </div>
          
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>

        {children}
      </main>
    </div>
  );
};
