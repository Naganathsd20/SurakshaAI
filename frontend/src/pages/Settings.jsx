import React from 'react';
import { Settings as SettingsIcon, Sliders, Shield, Bell, Moon } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-[#00ff66]" />
            Application Settings
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            System configuration & regional preferences baseline
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400">
          PHASE 1 FOUNDATION
        </span>
      </div>

      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-slate-300 pb-3 border-b border-slate-800">
          <Sliders className="w-5 h-5 text-[#00ff66]" />
          <h2 className="text-base font-bold font-heading">System Preferences (Phase 1 Baseline)</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-[#00ff66]" />
              <div>
                <p className="text-white font-semibold">Visual Theme</p>
                <p className="text-slate-500">Futuristic Cybersecurity (Dark + Neon Green Accent)</p>
              </div>
            </div>
            <span className="text-[#00ff66] font-mono-cyber text-[11px] bg-emerald-950 px-2.5 py-1 rounded border border-[#00ff66]/30">LOCKED THEME</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#00ff66]" />
              <div>
                <p className="text-white font-semibold">Default Target Language</p>
                <p className="text-slate-500">Auto-Detect Indic & English</p>
              </div>
            </div>
            <span className="text-slate-400 font-mono-cyber text-[11px]">PHASE 1 DEFAULTS</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#00ff66]" />
              <div>
                <p className="text-white font-semibold">System Diagnostics</p>
                <p className="text-slate-500">Local API Connection Monitoring</p>
              </div>
            </div>
            <span className="text-slate-400 font-mono-cyber text-[11px]">ENABLED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
