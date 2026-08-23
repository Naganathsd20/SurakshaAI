import React from 'react';
import { Info, Code2, Users, Target, Shield } from 'lucide-react';

export const About = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
          <Info className="w-6 h-6 text-emerald-400" />
          About SurakshaAI
        </h1>
        <p className="text-xs text-slate-400 font-mono-cyber mt-1">
          AI-Powered Regional-Language Phishing Detection
        </p>
      </div>

      {/* Description Card */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-heading font-bold text-sm">
          <Target className="w-4 h-4" />
          <span>PROJECT PURPOSE & DESCRIPTION</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          SurakshaAI is a cybersecurity platform designed to help users identify potentially malicious phishing messages and URLs, with a focus on regional-language threats.
        </p>
      </div>

      {/* Tech Stack & Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Technology Stack */}
        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-heading font-bold text-sm">
            <Code2 className="w-4 h-4" />
            <span>TECHNOLOGY STACK</span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-300 font-mono-cyber">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span><strong>Frontend:</strong> React, Vite, Tailwind CSS, React Router</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span><strong>Backend:</strong> Node.js, Express.js</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span><strong>Database:</strong> MongoDB</span>
            </li>
            <li className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span><strong>AI / NLP:</strong> To be implemented in later phases</span>
            </li>
          </ul>
        </div>

        {/* Development Team */}
        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-heading font-bold text-sm">
            <Users className="w-4 h-4" />
            <span>DEVELOPMENT TEAM</span>
          </div>

          <div className="space-y-3 font-mono-cyber">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-white font-semibold">1. Naganath S Dharwadkar</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">DEVELOPER</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-white font-semibold">2. Nagashree S Dharwadkar</span>
              <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">DEVELOPER</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
