import React from 'react';
import { Globe, Link as LinkIcon, AlertCircle, Shield } from 'lucide-react';

export const URLAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
          <Globe className="w-6 h-6 text-emerald-400" />
          URL & Web Heuristic Analysis
        </h1>
        <p className="text-xs text-slate-400 font-mono-cyber mt-1">
          Scan web links for domain spoofing, suspicious TLDs, and phishing patterns
        </p>
      </div>

      {/* URL Input Box */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-5">
        <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
          <LinkIcon className="w-4 h-4 text-emerald-400" />
          TARGET URL FOR SCANNERS
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            disabled
            placeholder="https://example-suspicious-domain.com/login"
            className="flex-1 bg-[#070b12] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-400 focus:outline-none cursor-not-allowed font-mono-cyber"
          />
          <button
            disabled
            className="px-6 py-2.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-600 font-semibold text-xs font-mono-cyber cursor-not-allowed opacity-60 shrink-0"
          >
            SCAN URL
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>URL Scanner Heuristic engine scheduled for Phase 4 implementation</span>
        </div>
      </div>

      {/* URL Scan Diagnostics Card */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800/80 bg-slate-900/40 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-slate-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>SCANNER DIAGNOSTICS: STANDBY</span>
        </div>
        <p className="text-xs text-slate-500">
          Domain details, SSL check status, redirect trace, and threat indicators will be presented here upon full engine rollout.
        </p>
      </div>
    </div>
  );
};
