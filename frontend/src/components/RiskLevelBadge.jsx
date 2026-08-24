import React from 'react';
import { AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react';

export const RiskLevelBadge = ({ level = 'SAFE', showIcon = true, size = 'md' }) => {
  const normalizedLevel = String(level).toUpperCase();

  const styles = {
    HIGH: {
      bg: 'bg-red-950/80',
      border: 'border-red-500/40',
      text: 'text-red-400',
      icon: AlertTriangle,
      label: 'HIGH PHISHING RISK',
      glow: 'shadow-[0_0_12px_rgba(239,68,68,0.2)]'
    },
    MEDIUM: {
      bg: 'bg-amber-950/80',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      icon: AlertCircle,
      label: 'MEDIUM SUSPICION',
      glow: 'shadow-[0_0_12px_rgba(245,158,11,0.2)]'
    },
    SAFE: {
      bg: 'bg-emerald-950/80',
      border: 'border-[#00ff66]/40',
      text: 'text-[#00ff66]',
      icon: ShieldCheck,
      label: 'LIKELY SAFE',
      glow: 'shadow-[0_0_12px_rgba(0,255,102,0.2)]'
    }
  };

  const current = styles[normalizedLevel] || styles.SAFE;
  const IconComponent = current.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-cyber font-bold rounded-md border ${current.bg} ${current.border} ${current.text} ${current.glow} ${sizeClasses[size]}`}
    >
      {showIcon && <IconComponent className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{current.label}</span>
    </span>
  );
};
