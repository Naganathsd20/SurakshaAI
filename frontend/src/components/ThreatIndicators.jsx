import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export const ThreatIndicators = ({ indicators = [], evidenceList = [], riskLevel = 'SAFE' }) => {
  const isSafe = String(riskLevel).toUpperCase() === 'SAFE';

  // Use structured evidence list if available, or fallback to indicators array
  const hasEvidence = Array.isArray(evidenceList) && evidenceList.length > 0;

  return (
    <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-300 font-semibold border-b border-slate-800 pb-3">
        {isSafe ? (
          <CheckCircle className="w-4 h-4 text-[#00ff66]" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-400" />
        )}
        <span>DETECTED THREAT INDICATORS ({hasEvidence ? evidenceList.length : indicators.length})</span>
      </div>

      {isSafe && !hasEvidence && indicators.length === 0 ? (
        <p className="text-xs text-slate-500 font-mono-cyber">No threat anomalies detected.</p>
      ) : hasEvidence ? (
        <ul className="space-y-3">
          {evidenceList.map((item, index) => (
            <li
              key={index}
              className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1 text-xs font-mono-cyber"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <ShieldAlert className={`w-3.5 h-3.5 ${item.severity === 'high' ? 'text-red-400' : 'text-amber-400'}`} />
                  {item.label}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                    item.severity === 'high'
                      ? 'bg-red-950 text-red-400 border-red-500/30'
                      : 'bg-amber-950 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {item.severity || 'indicator'}
                </span>
              </div>
              {item.evidence && (
                <p className="text-[11px] text-slate-400 bg-slate-950/60 px-2 py-1 rounded border border-slate-800/80">
                  {item.evidence}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-2">
          {indicators.map((item, index) => (
            <li
              key={index}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs font-mono-cyber ${
                isSafe
                  ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${isSafe ? 'bg-[#00ff66]' : 'bg-red-400'}`} />
              <span>{typeof item === 'string' ? item : item.label || JSON.stringify(item)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
