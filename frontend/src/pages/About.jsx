import React from 'react';
import { Info, Shield, Code, Cpu } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, PHASE } from '../utils/constants';

export const About = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <Info className="w-6 h-6 text-[#00ff66]" />
            About SurakshaAI
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Platform architecture & vision overview
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          {PHASE}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-heading">
            <Shield className="w-5 h-5 text-[#00ff66]" />
            <h2>Mission & Vision</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {APP_TAGLINE}. Designed to bridge the digital security divide across Indic regional languages.
          </p>
        </div>

        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold font-heading">
            <Cpu className="w-5 h-5 text-[#00ff66]" />
            <h2>Tech Stack Baseline</h2>
          </div>
          <ul className="text-xs text-slate-400 space-y-1.5 font-mono-cyber">
            <li>• Frontend: React 18 + Vite + Tailwind CSS</li>
            <li>• Backend: Node.js + Express</li>
            <li>• Database: MongoDB Atlas / Mongoose ORM</li>
            <li>• Communication: REST API via CORS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
