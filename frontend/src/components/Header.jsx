import React, { useState } from 'react';
import { Shield, Activity, Terminal, Menu } from 'lucide-react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { MobileNav } from './MobileNav';
import { APP_NAME, PHASE } from '../utils/constants';

export const Header = () => {
  const health = useHealthCheck();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#05080e]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* Left Side: Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-[#00ff66]" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center shadow-[0_0_12px_rgba(0,255,102,0.2)]">
              <Shield className="w-5 h-5 text-[#00ff66]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg font-heading tracking-wide text-white">{APP_NAME}</span>
                <span className="text-[10px] font-mono-cyber px-2 py-0.5 rounded bg-emerald-950 text-[#00ff66] border border-[#00ff66]/30">
                  v1.0-DEV
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Regional-Language Phishing Detection</p>
            </div>
          </div>
        </div>

        {/* Right Side: System Status Indicators */}
        <div className="flex items-center gap-4">
          {/* Phase Badge */}
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono-cyber px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-[#00ff66]" />
            <span>{PHASE}</span>
          </div>

          {/* Backend Health Connection Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono-cyber px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800">
            <Activity className={`w-3.5 h-3.5 ${health.online ? 'text-[#00ff66] animate-pulse' : 'text-amber-400'}`} />
            <span className="text-slate-400 hidden xs:inline">Backend:</span>
            {health.loading ? (
              <span className="text-slate-400">Connecting...</span>
            ) : health.online ? (
              <span className="text-[#00ff66] font-semibold">ONLINE (200 OK)</span>
            ) : (
              <span className="text-amber-400 font-semibold">DISCONNECTED</span>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Overlay */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
};
