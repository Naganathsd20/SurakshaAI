import React from 'react';
import { 
  Info, 
  Shield, 
  Cpu, 
  Globe, 
  Users, 
  Code2, 
  CheckCircle2, 
  Target,
  Sparkles
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE, PHASE } from '../utils/constants';

export const About = () => {
  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <Info className="w-6 h-6 text-[#00ff66]" />
            About SurakshaAI
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Platform architecture, mission, and regional language security vision
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66]">
          {PHASE}
        </span>
      </div>

      {/* Main Vision Banner */}
      <div className="cyber-card p-8 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#00ff66]">
          <Sparkles className="w-4 h-4" />
          <span>CYBERSECURITY FOR EVERY REGIONAL SCRIPT</span>
        </div>
        <h2 className="text-2xl font-extrabold font-heading text-white">
          Bridging the Regional Phishing Defense Gap
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed font-sans">
          {APP_NAME} is an AI-powered regional-language phishing detection and awareness platform created to protect non-English speaking citizens across India from digital scams, SMS fraud, domain spoofing, and social engineering attacks.
        </p>
      </div>

      {/* Grid: Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-bold font-heading">
            <Target className="w-5 h-5" />
            <h3>The Regional Language Challenge</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            As millions of first-time digital users in tier-2 and tier-3 cities embrace UPI payments and mobile banking, cyber criminals exploit regional language trust (Hindi, Kannada, Tamil, Marathi, Telugu) to impersonate banks and utility providers. Standard English-only spam filters fail to detect localized script nuances.
          </p>
        </div>

        <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-[#00ff66] font-bold font-heading">
            <Shield className="w-5 h-5" />
            <h3>The SurakshaAI Solution</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            SurakshaAI provides multi-layer heuristic and NLP script analysis capable of parsing regional Indic syntax, evaluating domain legitimacy, calculating explainable risk scores (0–100), and offering actionable protective guidance in the user's native language.
          </p>
        </div>
      </div>

      {/* Tech Architecture Section */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold font-heading border-b border-slate-800 pb-3">
          <Cpu className="w-5 h-5 text-[#00ff66]" />
          <h2>Technology Stack Architecture</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono-cyber text-xs">
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[#00ff66] font-bold">FRONTEND LAYER</span>
            <ul className="text-slate-400 space-y-1 text-[11px]">
              <li>• React 18 + Vite</li>
              <li>• Tailwind CSS v4</li>
              <li>• React Router DOM</li>
              <li>• Lucide Icon Suite</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[#00ff66] font-bold">BACKEND API</span>
            <ul className="text-slate-400 space-y-1 text-[11px]">
              <li>• Node.js Runtime</li>
              <li>• Express REST API</li>
              <li>• CORS Middleware</li>
              <li>• Dotenv Config</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-[#00ff66] font-bold">DATABASE & AI</span>
            <ul className="text-slate-400 space-y-1 text-[11px]">
              <li>• MongoDB Atlas / Mongoose</li>
              <li>• Regional NLP Engine</li>
              <li>• Risk Scoring Heuristics</li>
              <li>• Explainable AI Rules</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Team Details */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold font-heading border-b border-slate-800 pb-3">
          <Users className="w-5 h-5 text-[#00ff66]" />
          <h2>Development Team</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-cyber">
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-950 border border-[#00ff66]/40 flex items-center justify-center font-bold text-[#00ff66]">
              01
            </div>
            <div>
              <p className="text-white font-bold">Naganath S Dharwadkar</p>
              <p className="text-slate-500 text-[10px]">Lead Developer & System Architect</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-emerald-950 border border-[#00ff66]/40 flex items-center justify-center font-bold text-[#00ff66]">
              02
            </div>
            <div>
              <p className="text-white font-bold">Nagashree S Dharwadkar</p>
              <p className="text-slate-500 text-[10px]">Co-Developer & Security Research</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
