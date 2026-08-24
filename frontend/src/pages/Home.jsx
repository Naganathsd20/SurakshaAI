import React from 'react';
import { Shield, ArrowRight, Server, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export const Home = () => {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Container */}
      <div className="cyber-card p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#00ff66]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-[#00ff66]/30 text-xs font-mono-cyber text-[#00ff66]">
          <Shield className="w-3.5 h-3.5" />
          <span>Phase 1 — Project Foundation Operational</span>
        </div>

        <div className="space-y-3 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            {APP_NAME}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            {APP_TAGLINE}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center gap-2 hover:bg-[#00cc52] transition-colors shadow-[0_0_15px_rgba(0,255,102,0.3)]"
          >
            <span>GO TO DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="px-5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-semibold text-xs font-mono-cyber hover:border-slate-700 transition-colors"
          >
            ABOUT PROJECT
          </Link>
        </div>
      </div>

      {/* Phase 1 Verification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-[#00ff66] font-mono-cyber text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>React + Vite Client</span>
          </div>
          <p className="text-xs text-slate-400">Tailwind CSS v4 design system configured with dark cybersecurity theme.</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-[#00ff66] font-mono-cyber text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Node.js + Express Server</span>
          </div>
          <p className="text-xs text-slate-400">REST API architecture running with CORS and `/api/health` verification.</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-[#00ff66] font-mono-cyber text-xs font-bold">
            <Server className="w-4 h-4" />
            <span>MongoDB Atlas Config</span>
          </div>
          <p className="text-xs text-slate-400">Environment variable pattern prepared for database integration.</p>
        </div>
      </div>
    </div>
  );
};
