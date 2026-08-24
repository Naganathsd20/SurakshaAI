import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  MessageSquareCode, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Lock, 
  Users, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE, SUPPORTED_LANGUAGES } from '../utils/constants';

export const Home = () => {
  return (
    <div className="space-y-12 py-2">
      {/* Hero Section */}
      <section className="relative cyber-card p-6 sm:p-10 rounded-2xl border border-slate-800 space-y-6 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#00ff66]/30 text-xs font-mono-cyber text-[#00ff66]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Regional Cybersecurity & AI Phishing Defense</span>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Protecting Regional Digital Communications with <span className="text-[#00ff66]">AI Defense</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
            {APP_TAGLINE}. Designed to protect citizens against malicious SMS, UPI scams, domain spoofing, and social engineering in Indic regional languages.
          </p>
        </div>

        {/* Primary & Secondary Call to Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <Link
            to="/analyze-message"
            className="px-6 py-3 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center gap-2 hover:bg-[#00cc52] transition-colors shadow-[0_0_20px_rgba(0,255,102,0.3)]"
          >
            <MessageSquareCode className="w-4 h-4" />
            <span>ANALYZE MESSAGE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/analyze-url"
            className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs font-mono-cyber hover:border-[#00ff66]/50 hover:text-white transition-colors flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#00ff66]" />
            <span>ANALYZE URL</span>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono-cyber">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00ff66]" />
            <span>7+ Indic Languages Supported</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00ff66]" />
            <span>Privacy-First Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#00ff66]" />
            <span>AI Risk Scoring Engine</span>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold font-heading text-white">The Regional Phishing Challenge</h2>
          <p className="text-xs text-slate-400">
            Cyber criminals exploit regional language trust barriers to carry out deceptive fraud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">Targeted Regional Scams</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Phishing messages crafted in Hindi, Kannada, Tamil, and Marathi bypass conventional English-only filters, deceiving unsuspecting users with local urgency.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">Banking & KYC Fraud</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fake PAN/KYC update requests and immediate electricity disconnection threats force panicked users to click malicious links or share OTPs.
            </p>
          </div>

          <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66]">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-heading text-white">Domain Spoofing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Typosquatting web domains masquerade as official government or banking portals to harvest sensitive passwords and UPI credentials.
            </p>
          </div>
        </div>
      </section>

      {/* How SurakshaAI Works */}
      <section className="cyber-card p-8 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white">How SurakshaAI Protects You</h2>
            <p className="text-xs text-slate-400 mt-1">Simple 3-step threat detection and explainability workflow</p>
          </div>
          <span className="text-xs font-mono-cyber px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] self-start sm:self-auto">
            WORKFLOW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-[#00ff66]/40 flex items-center justify-center font-bold font-mono-cyber text-[#00ff66] text-sm">
              01
            </div>
            <h3 className="text-base font-bold font-heading text-white">Paste Message or Link</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Copy any suspicious SMS, WhatsApp message, email snippet, or website URL into the analyzer.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-[#00ff66]/40 flex items-center justify-center font-bold font-mono-cyber text-[#00ff66] text-sm">
              02
            </div>
            <h3 className="text-base font-bold font-heading text-white">Multi-Layer Scan</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our AI rules engine scans regional linguistics, domain legitimacy, urgency patterns, and fraud heuristics.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-[#00ff66]/40 flex items-center justify-center font-bold font-mono-cyber text-[#00ff66] text-sm">
              03
            </div>
            <h3 className="text-base font-bold font-heading text-white">Explainable Risk Score</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive a clear Safe/Medium/High risk score, detected anomaly indicators, and clear protective recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Regional Language Support Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">Supported Regional Languages</h2>
            <p className="text-xs text-slate-400">Tailored detection engines for major Indic language scripts</p>
          </div>
          <Users className="w-5 h-5 text-[#00ff66]" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="cyber-card p-3 rounded-lg border border-slate-800 text-center space-y-1 hover:border-[#00ff66]/40 transition-colors"
            >
              <p className="text-xs font-bold text-white">{lang.name.split(' ')[0]}</p>
              <p className="text-[10px] text-[#00ff66] font-mono-cyber">{lang.name.split(' ')[1] || lang.code.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="cyber-card p-8 rounded-2xl border border-[#00ff66]/30 bg-gradient-to-r from-slate-900 via-[#070e1b] to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,255,102,0.1)]">
        <div className="space-y-2 text-center sm:text-left">
          <h2 className="text-2xl font-bold font-heading text-white">Received a Suspicious Message?</h2>
          <p className="text-xs text-slate-400 max-w-lg">
            Verify any SMS or link instantly with SurakshaAI before clicking or sharing sensitive details.
          </p>
        </div>

        <Link
          to="/analyze-message"
          className="px-6 py-3 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center gap-2 hover:bg-[#00cc52] transition-colors shrink-0 shadow-[0_0_15px_rgba(0,255,102,0.3)]"
        >
          <span>START FREE SCAN</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
