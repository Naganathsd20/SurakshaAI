import React from 'react';
import { Shield, ShieldAlert, Cpu, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#070c14]/90 backdrop-blur-md border-b border-emerald-950/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/40 group-hover:border-emerald-400 cyber-glow-green transition-all">
            <Shield className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-emerald-500/10 rounded-lg animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-xl font-bold tracking-wider text-white">
                SURAKSHA<span className="text-emerald-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono-cyber font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded">
                PHASE 1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-mono-cyber hidden sm:block">
              Regional-Language Cybersecurity Defense
            </p>
          </div>
        </Link>

        {/* System Status Metrics */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-mono-cyber">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">CORE SYSTEM:</span>
            <span className="text-emerald-400 font-semibold">ONLINE</span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-full text-xs font-mono-cyber text-emerald-300">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline text-slate-400">BACKEND API:</span>
            <span className="text-emerald-400 font-semibold">FOUNDATION READY</span>
          </div>
        </div>

      </div>
    </header>
  );
};
