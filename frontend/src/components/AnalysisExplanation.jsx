import React from 'react';
import { BookOpen } from 'lucide-react';

export const AnalysisExplanation = ({ explanation = '', languageLabel = '' }) => {
  return (
    <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-300 font-semibold">
          <BookOpen className="w-4 h-4 text-[#00ff66]" />
          <span>ANALYSIS & REASONING</span>
        </div>
        {languageLabel && (
          <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            Language: {languageLabel}
          </span>
        )}
      </div>

      <p className="text-xs text-slate-300 leading-relaxed font-sans">
        {explanation || 'Analysis details will be displayed here.'}
      </p>
    </div>
  );
};
