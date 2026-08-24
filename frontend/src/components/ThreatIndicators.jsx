import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export const ThreatIndicators = ({ indicators = [], riskLevel = 'SAFE' }) => {
  const isSafe = String(riskLevel).toUpperCase() === 'SAFE';

  return (
    <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-300 font-semibold border-b border-slate-800 pb-3">
        {isSafe ? (
          <CheckCircle className="w-4 h-4 text-[#00ff66]" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-400" />
        )}
        <span>DETECTED THREAT INDICATORS ({indicators.length})</span>
      </div>

      {indicators.length === 0 ? (
        <p className="text-xs text-slate-500 font-mono-cyber">No threat anomalies detected.</p>
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
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
