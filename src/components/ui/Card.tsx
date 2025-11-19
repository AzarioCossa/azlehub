import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, children, className = '', action }) => (
  <div className={cn("bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-all hover:shadow-md", className)}>
    {(title || description) && (
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
        <div>
          {title && <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>}
          {description && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
        </div>
        {action}
      </div>
    )}
    <div className="p-6">
      {children}
    </div>
  </div>
);