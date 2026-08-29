import React from 'react';
import { Layers, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export const WeightedEvidence = ({ weightedEvidence = [], scoringBreakdown = {} }) => {
  if (!weightedEvidence || weightedEvidence.length === 0) {
    return (
      <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-3 bg-slate-900/60">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#00ff66]">
            <Layers className="w-4 h-4" />
            <span className="font-bold tracking-wider">PHASE 6 WEIGHTED EVIDENCE BREAKDOWN</span>
          </div>
          <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
            0 DETECTED DRIVERS
          </span>
        </div>
        <p className="text-xs font-mono-cyber text-slate-400 p-2 text-center">
          No threat drivers contribute to the risk score.
        </p>
      </div>
    );
  }

  return (
    <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-4 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#00ff66]">
          <Layers className="w-4 h-4" />
          <span className="font-bold tracking-wider">PHASE 6 WEIGHTED EVIDENCE BREAKDOWN</span>
        </div>

        <span className="text-[10px] font-mono-cyber px-2.5 py-0.5 rounded bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66]">
          CROSS-LAYER DEDUPLICATED ENGINE
        </span>
      </div>

      <div className="space-y-2.5">
        {weightedEvidence.map((item, index) => {
          const isHigh = item.severity === 'HIGH';
          const isMedium = item.severity === 'MEDIUM';

          return (
            <div
              key={index}
              className="p-3.5 rounded-lg bg-[#05080e] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold ${
                    isHigh 
                      ? 'bg-red-950/80 border border-red-500/40 text-red-300' 
                      : isMedium 
                      ? 'bg-amber-950/80 border border-amber-500/40 text-amber-300'
                      : 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                  }`}>
                    {item.severity} SEVERITY
                  </span>

                  <span className="text-xs font-bold text-white font-heading">{item.label}</span>
                </div>

                {item.evidence && (
                  <p className="text-[11px] font-mono-cyber text-slate-400">
                    {item.evidence}
                  </p>
                )}

                {/* Sources Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  <span className="text-[10px] font-mono-cyber text-slate-500">SOURCES:</span>
                  {item.sources.map((src, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.2 rounded text-[9px] font-mono-cyber bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1"
                    >
                      {src.includes('NLP') ? <Sparkles className="w-2.5 h-2.5 text-[#00ff66]" /> : <Cpu className="w-2.5 h-2.5 text-cyan-400" />}
                      <span>{src}</span>
                    </span>
                  ))}
                  {item.sources.length > 1 && (
                    <span className="text-[9px] font-mono-cyber text-[#00ff66] font-bold">
                      (+5 Multi-Layer Boost)
                    </span>
                  )}
                </div>
              </div>

              {/* Weight Points Badge */}
              <div className="shrink-0 text-right">
                <span className="text-[10px] font-mono-cyber text-slate-500 block">RISK WEIGHT</span>
                <span className="text-sm font-mono-cyber font-extrabold text-[#00ff66]">
                  +{item.weight} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
