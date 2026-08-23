import React from 'react';
import { LayoutDashboard, Activity, ShieldCheck, AlertOctagon, Info } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-emerald-400" />
            Security Overview Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Real-time Threat Monitoring & System Telemetry
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono-cyber">
          <Activity className="w-4 h-4 animate-pulse text-emerald-400" />
          <span>PHASE 1 FOUNDATION STATE</span>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cyber-card p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
            <span>TOTAL ANALYSES</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-heading text-white mt-2">0</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono-cyber">System initialized</p>
        </div>

        <div className="cyber-card p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
            <span>THREATS BLOCKED</span>
            <AlertOctagon className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-2xl font-bold font-heading text-rose-400 mt-2">0</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono-cyber">Phase 1 placeholder</p>
        </div>

        <div className="cyber-card p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
            <span>ACCURACY MATRIX</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold font-heading text-emerald-400 mt-2">N/A</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono-cyber">Engine pending Phase 4</p>
        </div>
      </div>

      {/* Placeholder Workspace Card */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <Info className="w-5 h-5 shrink-0" />
          <h2 className="text-base font-bold font-heading">Dashboard Module Status</h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          The Dashboard interface has been structured according to Phase 1 specs. Live analytics telemetry, chart visuals, and regional threat feeds will be attached in subsequent development phases.
        </p>
      </div>
    </div>
  );
};
