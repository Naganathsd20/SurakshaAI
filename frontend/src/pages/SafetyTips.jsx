import React from 'react';
import { ShieldCheck, AlertTriangle, Lock, Eye, BookOpen } from 'lucide-react';

export const SafetyTips = () => {
  const tips = [
    {
      title: "Identify Urgent Requests",
      desc: "Scammers often create a sense of extreme urgency requiring immediate action (e.g. 'Account suspended within 10 mins').",
      icon: AlertTriangle,
      border: "border-amber-500/30",
      accent: "text-amber-400"
    },
    {
      title: "Check Sender Addresses & Domain Names",
      desc: "Verify domain spellings carefully. Attackers replace characters like 'o' with '0' or use non-standard extensions.",
      icon: Lock,
      border: "border-emerald-500/30",
      accent: "text-emerald-400"
    },
    {
      title: "Regional Language Spoofing",
      desc: "Be cautious of messages in your local language requesting sensitive OTPs, banking credentials, or UPI payments.",
      icon: Eye,
      border: "border-blue-500/30",
      accent: "text-blue-400"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          Cyber Awareness & Safety Tips
        </h1>
        <p className="text-xs text-slate-400 font-mono-cyber mt-1">
          Essential cybersecurity best practices to safeguard against phishing attempts
        </p>
      </div>

      {/* Safety Tips List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tips.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div key={idx} className={`cyber-card p-5 rounded-xl border ${item.border} space-y-3`}>
              <div className={`w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center ${item.accent}`}>
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold font-heading text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="cyber-card p-5 rounded-xl border border-slate-800 flex items-center gap-3 text-xs text-slate-400 font-mono-cyber">
        <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>Additional regional awareness materials will be added in future platform iterations.</span>
      </div>
    </div>
  );
};
