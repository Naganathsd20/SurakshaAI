import React from 'react';
import { Globe, Clock } from 'lucide-react';

export const URLAnalysis = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#00ff66]" />
            URL & Web Link Analysis
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Phase 1 Placeholder — URL scanner UI scheduled for Phase 2
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          PHASE 1 FOUNDATION
        </span>
      </div>

      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-slate-300">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold font-heading">URL Scanner UI Standby</h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Suspicious web link input fields, domain heuristic indicators, and redirect tracing diagnostics will be integrated in <strong>Phase 2 & Phase 4</strong>.
        </p>
      </div>
    </div>
  );
};
