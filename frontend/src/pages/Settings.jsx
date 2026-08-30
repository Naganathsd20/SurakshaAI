import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Sliders, 
  Shield, 
  Bell, 
  Moon, 
  Globe, 
  Check, 
  Terminal,
  Info
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, APP_NAME } from '../utils/constants';

export const Settings = () => {
  const [defaultLang, setDefaultLang] = useState('hi');
  const [notifications, setNotifications] = useState(true);
  const [autoScanLinks, setAutoScanLinks] = useState(true);

  return (
    <div className="space-y-6 py-2 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 text-[#00ff66]" />
            Application Settings
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Configure regional language defaults, UI theme, and security preferences
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] shrink-0 self-start sm:self-auto">
          PREFERENCES
        </span>
      </div>

      {/* Preferences Form Container */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3 text-slate-300 pb-3 border-b border-slate-800">
          <Sliders className="w-5 h-5 text-[#00ff66]" />
          <h2 className="text-base font-bold font-heading">System Preferences</h2>
        </div>

        <div className="space-y-4">
          {/* Default Language Setting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#00ff66] shrink-0" />
              <div>
                <p className="text-white font-semibold">Default Regional Target Language</p>
                <p className="text-slate-500">Primary script for automated heuristics</p>
              </div>
            </div>
            <select
              value={defaultLang}
              onChange={(e) => setDefaultLang(e.target.value)}
              className="w-full sm:w-auto bg-[#05080e] border border-slate-800 rounded px-3 py-2 text-xs font-mono-cyber text-[#00ff66] focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 min-h-[38px]"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Display Setting */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#00ff66] shrink-0" />
              <div>
                <p className="text-white font-semibold">Visual Theme Identity</p>
                <p className="text-slate-500">Dark Cybersecurity (#05080e) + Neon Cyber Green Accent (#00ff66)</p>
              </div>
            </div>
            <span className="text-[#00ff66] font-mono-cyber text-[11px] bg-emerald-950 px-2.5 py-1 rounded border border-[#00ff66]/30">
              LOCKED THEME
            </span>
          </div>

          {/* Realtime Threat Alerts Setting */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#00ff66] shrink-0" />
              <div>
                <p className="text-white font-semibold">In-Browser Threat Alerts</p>
                <p className="text-slate-500">Display instant high-risk warning popups on analysis completion</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 focus:outline-none focus:ring-2 focus:ring-[#00ff66] ${
                notifications ? 'bg-[#00ff66]' : 'bg-slate-800'
              }`}
              aria-label="Toggle in-browser threat alerts"
              aria-checked={notifications}
            >
              <span
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Auto Heuristic Link Inspection */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#00ff66] shrink-0" />
              <div>
                <p className="text-white font-semibold">Heuristic Link Inspection</p>
                <p className="text-slate-500">Automatically inspect embedded URLs inside message text</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAutoScanLinks(!autoScanLinks)}
              className={`w-12 h-7 rounded-full transition-colors relative flex items-center px-1 focus:outline-none focus:ring-2 focus:ring-[#00ff66] ${
                autoScanLinks ? 'bg-[#00ff66]' : 'bg-slate-800'
              }`}
              aria-label="Toggle heuristic link inspection"
              aria-checked={autoScanLinks}
            >
              <span
                className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  autoScanLinks ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* System Metadata Box */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-3 font-mono-cyber text-xs">
        <div className="flex items-center gap-2 text-white font-bold font-heading">
          <Terminal className="w-4 h-4 text-[#00ff66]" />
          <span>System Information</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400 text-[11px]">
          <p>Application Name: <strong className="text-white">{APP_NAME}</strong></p>
          <p>System Version: <strong className="text-[#00ff66]">v1.0.0 (Production)</strong></p>
          <p>Frontend Engine: <strong className="text-white">React 18 + Vite</strong></p>
          <p>Backend Service: <strong className="text-[#00ff66]">Connected & Operational</strong></p>
        </div>
      </div>
    </div>
  );
};
