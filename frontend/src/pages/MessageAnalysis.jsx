import React from 'react';
import { MessageSquareWarning, Shield, Globe2, AlertCircle } from 'lucide-react';

export const MessageAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
          <MessageSquareWarning className="w-6 h-6 text-emerald-400" />
          Regional-Language Message Analysis
        </h1>
        <p className="text-xs text-slate-400 font-mono-cyber mt-1">
          Detect phishing, scam, and fraudulent intent in English and regional Indian languages
        </p>
      </div>

      {/* Input Container Placeholder */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-emerald-400" />
            INPUT PHISHING MESSAGE TEXT (SMS / WHATSAPP / EMAIL)
          </label>
          <span className="text-[11px] font-mono-cyber text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            PLACEHOLDER MODE
          </span>
        </div>

        <textarea
          disabled
          rows={5}
          placeholder="Enter regional message snippet here for phishing inspection (Detection Engine disabled in Phase 1)..."
          className="w-full bg-[#070b12] border border-slate-800 rounded-lg p-3 text-sm text-slate-400 focus:outline-none cursor-not-allowed font-mono-cyber"
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>AI NLP detection pipeline will be integrated in Phase 4 & Phase 5</span>
          </div>

          <button
            disabled
            className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-600 font-semibold text-xs font-mono-cyber cursor-not-allowed opacity-60"
          >
            ANALYZE MESSAGE
          </button>
        </div>
      </div>

      {/* Risk Output Container Placeholder */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>INSPECTION RESULT STATUS: IDLE</span>
        </div>
        <p className="text-xs text-slate-500">
          Analysis outputs, risk levels (High / Medium / Safe), and regional language explanations will appear here once the analysis engine is active.
        </p>
      </div>
    </div>
  );
};
