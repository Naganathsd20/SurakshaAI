import React from 'react';
import { BrainCircuit, AlertCircle, CheckCircle, ShieldAlert, Cpu } from 'lucide-react';

export const IntentSignals = ({ intentSignals = [], nlpAnalysis = {} }) => {
  const {
    phishingIntent = false,
    intentSummary = '',
    provider = 'local-nlp-engine',
    isAiModelUsed = false
  } = nlpAnalysis;

  const providerLabel = isAiModelUsed ? 'Gemini 1.5 Flash AI' : 'Deterministic Local NLP Engine';

  return (
    <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-4 bg-slate-900/60">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#00ff66]">
          <BrainCircuit className="w-4 h-4 text-[#00ff66]" />
          <span className="font-bold tracking-wider">PHASE 5 NLP INTENT ANALYSIS</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-cyber px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-[#00ff66]" />
            <span>PROVENANCE: {providerLabel}</span>
          </span>
        </div>
      </div>

      {/* Summary Banner */}
      <div className={`p-3.5 rounded-lg border text-xs font-mono-cyber flex items-start gap-2.5 ${
        phishingIntent 
          ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' 
          : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
      }`}>
        {phishingIntent ? (
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle className="w-4 h-4 text-[#00ff66] shrink-0 mt-0.5" />
        )}
        <div>
          <span className="font-bold block text-white font-heading">
            {phishingIntent ? 'MALICIOUS PHISHING INTENT DETECTED' : 'NO PHISHING INTENTS DETECTED'}
          </span>
          <p className="mt-1 text-[11px] text-slate-300 leading-relaxed">{intentSummary}</p>
        </div>
      </div>

      {/* Intent Signals List */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono-cyber text-slate-400 font-semibold block">
          EXTRACTED INTENT SIGNALS ({intentSignals.length})
        </span>

        {intentSignals.length === 0 ? (
          <div className="p-3 rounded-lg bg-[#05080e] border border-slate-800 text-xs font-mono-cyber text-slate-400 text-center">
            No psychological urgency, threats, or credential harvesting intent patterns detected.
          </div>
        ) : (
          <div className="space-y-2">
            {intentSignals.map((signal, index) => {
              const confPct = Math.round((signal.confidence || 0.85) * 100);
              return (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-[#05080e] border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono-cyber font-bold bg-slate-900 border border-slate-700 text-[#00ff66]">
                        {signal.code}
                      </span>
                      <span className="text-xs font-medium text-slate-200">{signal.label}</span>
                    </div>
                    {signal.evidence && (
                      <p className="text-[11px] font-mono-cyber text-slate-400 pl-1">
                        {signal.evidence}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-mono-cyber text-slate-500 block">INTENT CONFIDENCE</span>
                    <span className="text-xs font-mono-cyber font-bold text-[#00ff66]">{confPct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
