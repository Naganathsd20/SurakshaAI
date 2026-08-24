import React from 'react';
import { RiskLevelBadge } from './RiskLevelBadge';
import { Gauge } from 'lucide-react';

export const RiskScoreCard = ({ score = 0, riskLevel = 'SAFE' }) => {
  const normalizedLevel = String(riskLevel).toUpperCase();

  const getColorClass = () => {
    if (normalizedLevel === 'HIGH') return { bar: 'bg-red-500', text: 'text-red-400', border: 'border-red-500/30' };
    if (normalizedLevel === 'MEDIUM') return { bar: 'bg-amber-400', text: 'text-amber-400', border: 'border-amber-500/30' };
    return { bar: 'bg-[#00ff66]', text: 'text-[#00ff66]', border: 'border-[#00ff66]/30' };
  };

  const style = getColorClass();

  return (
    <div className={`cyber-card p-6 rounded-xl border ${style.border} space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-400">
          <Gauge className="w-4 h-4 text-slate-300" />
          <span>RISK ASSESSMENT SCORE</span>
        </div>
        <RiskLevelBadge level={riskLevel} size="md" />
      </div>

      <div className="flex items-baseline gap-3">
        <span className={`text-4xl sm:text-5xl font-extrabold font-mono-cyber ${style.text}`}>
          {score}
        </span>
        <span className="text-sm font-mono-cyber text-slate-500">/ 100 Risk Points</span>
      </div>

      {/* Progress Bar Gauge */}
      <div className="space-y-1.5">
        <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
            style={{ width: `${Math.min(Math.max(score, 5), 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono-cyber text-slate-500">
          <span>0 (Safe)</span>
          <span>50 (Moderate)</span>
          <span>100 (Severe Threat)</span>
        </div>
      </div>
    </div>
  );
};
