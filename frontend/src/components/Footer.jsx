import React from 'react';
import { Shield } from 'lucide-react';
import { APP_NAME } from '../utils/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#05080e] px-4 lg:px-6 py-4 text-xs text-slate-500 font-mono-cyber flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-[#00ff66]" />
        <span>&copy; 2026 {APP_NAME}. Protecting users from phishing and digital scams.</span>
      </div>
      <div>
        <span>AI-Powered Threat Protection</span>
      </div>
    </footer>
  );
};
