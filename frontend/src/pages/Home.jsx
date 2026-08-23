import React from 'react';
import { Shield, Sparkles, AlertTriangle, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0c1322] via-[#09101c] to-[#05080e] p-6 md:p-10 border border-emerald-500/30 cyber-glow-green overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono-cyber mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PHASE 1 FOUNDATION ACTIVE</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
          Suraksha<span className="text-emerald-400">AI</span>
        </h1>
        
        <p className="mt-3 text-lg text-emerald-400/90 font-medium max-w-2xl">
          AI-Powered Regional-Language Phishing Detection
        </p>

        <p className="mt-4 text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
          Shielding users against sophisticated cyber threats, scams, and malicious URLs across Indic regional languages. Phase 1 establishes the baseline frontend structure and express backend foundation.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all cyber-glow-green"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-medium transition-all"
          >
            Project Overview
          </Link>
        </div>
      </div>

      {/* Feature Modules Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">Message Analysis</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Multi-lingual text threat detection engine designed for SMS, WhatsApp, and email messages.
          </p>
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono-cyber text-slate-500 pt-2 border-t border-slate-800">
            <span>STATUS</span>
            <span className="text-amber-400">PHASE 1 PLACEHOLDER</span>
          </div>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">URL Scanner</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Real-time web URL heuristic scanner to identify deceptive domains and credential harvesters.
          </p>
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono-cyber text-slate-500 pt-2 border-t border-slate-800">
            <span>STATUS</span>
            <span className="text-amber-400">PHASE 1 PLACEHOLDER</span>
          </div>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all group">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">Risk Scoring</h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Explainable AI threat level scoring (Safe, Suspicious, High Risk) with regional context breakdown.
          </p>
          <div className="mt-4 flex items-center justify-between text-[11px] font-mono-cyber text-slate-500 pt-2 border-t border-slate-800">
            <span>STATUS</span>
            <span className="text-amber-400">PHASE 1 PLACEHOLDER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
