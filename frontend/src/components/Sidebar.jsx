import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  MessageSquareCode, 
  Globe, 
  History, 
  ShieldAlert, 
  Info, 
  Settings 
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/analyze-message', label: 'Message Analysis', icon: MessageSquareCode },
  { path: '/analyze-url', label: 'URL Analysis', icon: Globe },
  { path: '/history', label: 'Analysis History', icon: History },
  { path: '/safety-tips', label: 'Safety Guidelines', icon: ShieldAlert },
  { path: '/about', label: 'About Project', icon: Info },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-[#070b13] border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-mono-cyber text-slate-500 uppercase tracking-wider font-semibold">
          Platform Navigation
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-950/70 text-[#00ff66] border border-[#00ff66]/30 shadow-[0_0_10px_rgba(0,255,102,0.1)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Cyber Security Status Footer Box */}
      <div className="cyber-card p-3 rounded-lg border border-slate-800/80 bg-slate-900/40 text-[11px] font-mono-cyber text-slate-400 space-y-1">
        <div className="flex items-center gap-2 text-[#00ff66]">
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-ping" />
          <span className="font-bold">PHASE 1 ACTIVE</span>
        </div>
        <p className="text-[10px] text-slate-500">Foundation established. Local API connected.</p>
      </div>
    </aside>
  );
};
