import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  X, 
  Shield, 
  Home, 
  LayoutDashboard, 
  MessageSquareCode, 
  Globe, 
  History, 
  ShieldAlert, 
  Info, 
  Settings 
} from 'lucide-react';
import { APP_NAME } from '../utils/constants';

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

export const MobileNav = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 md:hidden flex"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu drawer"
    >
      {/* Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Slide-over Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-[#070b13] border-r border-slate-800 p-5 flex flex-col justify-between z-10 shadow-2xl h-full animate-fade-in">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#00ff66]" />
              </div>
              <span className="font-bold text-base font-heading text-white">{APP_NAME}</span>
            </div>
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] p-2.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-semibold transition-colors min-h-[44px] ${
                      isActive
                        ? 'bg-emerald-950/80 text-[#00ff66] border border-[#00ff66]/30'
                        : 'text-slate-300 hover:bg-slate-900 border border-transparent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 text-[#00ff66]" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-4 border-t border-slate-800 text-[10px] font-mono-cyber text-slate-500 space-y-1">
          <p className="text-slate-400 font-bold">SurakshaAI Security System</p>
          <p>Regional-Language Phishing Detection</p>
        </div>
      </div>
    </div>
  );
};

