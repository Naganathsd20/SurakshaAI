import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  MessageSquareWarning, 
  Globe, 
  History, 
  ShieldCheck, 
  Info, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/analyze-message', label: 'Message Analysis', icon: MessageSquareWarning },
  { path: '/analyze-url', label: 'URL Analysis', icon: Globe },
  { path: '/history', label: 'Analysis History', icon: History },
  { path: '/safety-tips', label: 'Safety Tips', icon: ShieldCheck },
  { path: '/about', label: 'About Project', icon: Info },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-[#070c14]/95 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 shrink-0 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <h2 className="text-[10px] font-mono-cyber uppercase tracking-widest text-slate-500 font-semibold">
            NAVIGATION MODULES
          </h2>
        </div>

        <nav className="grid grid-cols-2 md:grid-cols-1 gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40 cyber-glow-green shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-700/60 border border-transparent'
                  }`
                }
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Cyber Risk Status Indicator (Visual Element) */}
      <div className="hidden md:block mt-8 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs font-mono-cyber space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400">DEFENSE MATRIX</span>
          <span className="text-emerald-400 font-bold">READY</span>
        </div>
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <div className="bg-emerald-500 h-full w-full animate-pulse" />
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
          <span>RISK ENGINE</span>
          <span className="text-slate-400">PHASE 1 IDLE</span>
        </div>
      </div>
    </aside>
  );
};
