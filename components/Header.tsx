import React from 'react';
import { Beaker, GraduationCap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-rose-600 p-2 rounded-lg">
             <Beaker className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">MetaboSchema</h1>
            <p className="text-xs text-slate-500 font-medium">Chemical Drug Design • Fifth Level</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Pharmaceutical Medicinal Chemistry 2025/2026</span>
        </div>
      </div>
    </header>
  );
};