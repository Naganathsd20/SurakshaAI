import React from 'react';
import { Shield } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#05080e] border-t border-slate-800/80 py-4 px-6 text-xs text-slate-400 font-mono-cyber">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>SurakshaAI &copy; {new Date().getFullYear()} — Regional-Language Cybersecurity</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <span>Phase 1 — Project Foundation</span>
          <span>•</span>
          <span>Team: Naganath S Dharwadkar & Nagashree S Dharwadkar</span>
        </div>
      </div>
    </footer>
  );
};
