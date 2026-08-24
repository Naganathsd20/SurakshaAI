import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const SafetyRecommendation = ({ recommendations = [] }) => {
  return (
    <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-300 font-semibold border-b border-slate-800 pb-3">
        <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
        <span>ACTIONABLE SAFETY RECOMMENDATIONS</span>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-200"
          >
            <div className="w-5 h-5 rounded bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center shrink-0 mt-0.5">
              <ArrowRight className="w-3 h-3 text-[#00ff66]" />
            </div>
            <span className="leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
