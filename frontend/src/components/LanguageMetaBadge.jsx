import React from 'react';
import { Globe, Languages, Cpu } from 'lucide-react';

export const LanguageMetaBadge = ({ language }) => {
  if (!language) return null;

  const {
    name = 'English',
    selectedLanguage = 'en',
    detectedLanguage = 'en',
    scriptType = 'LATIN',
    confidence = 1.0,
    isFallback = false
  } = language;

  const isMatch = selectedLanguage === detectedLanguage;
  const confidencePct = Math.round((confidence || 1) * 100);

  return (
    <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-3 bg-slate-900/60">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2 text-xs font-mono-cyber text-[#00ff66]">
          <Globe className="w-4 h-4" />
          <span className="font-bold tracking-wider">LANGUAGE & SCRIPT IDENTIFICATION</span>
        </div>
        <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66]">
          NLP SCRIPT PRE-PROCESSING
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 text-xs font-mono-cyber">
        <div className="bg-[#05080e] p-2.5 rounded-lg border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">DETECTED LANGUAGE</span>
          <span className="font-bold text-white flex items-center gap-1.5 mt-0.5">
            <Languages className="w-3.5 h-3.5 text-[#00ff66]" />
            {name}
          </span>
        </div>

        <div className="bg-[#05080e] p-2.5 rounded-lg border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">SCRIPT TYPE</span>
          <span className="font-bold text-cyan-400 mt-0.5 block">{scriptType}</span>
        </div>

        <div className="bg-[#05080e] p-2.5 rounded-lg border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">SCRIPT CONFIDENCE</span>
          <span className="font-bold text-[#00ff66] mt-0.5 block">{confidencePct}%</span>
        </div>

        <div className="bg-[#05080e] p-2.5 rounded-lg border border-slate-800/80">
          <span className="text-[10px] text-slate-500 block">USER SELECTION MATCH</span>
          <span className={`font-bold mt-0.5 block ${isMatch ? 'text-[#00ff66]' : 'text-amber-400'}`}>
            {isMatch ? 'Exact Match' : `Selected: ${selectedLanguage.toUpperCase()}`}
          </span>
        </div>
      </div>

      {isFallback && (
        <p className="text-[11px] text-slate-400 font-mono-cyber flex items-center gap-1.5 pt-1">
          <Cpu className="w-3.5 h-3.5 text-amber-400" />
          <span>Default fallback language mapping applied for non-standard text.</span>
        </p>
      )}
    </div>
  );
};
