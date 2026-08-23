import React from 'react';
import { History as HistoryIcon, Database, HardDrive } from 'lucide-react';

export const History = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
          <HistoryIcon className="w-6 h-6 text-emerald-400" />
          Analysis History & Audit Log
        </h1>
        <p className="text-xs text-slate-400 font-mono-cyber mt-1">
          Historical log of analyzed messages, URLs, and risk assessments
        </p>
      </div>

      {/* Database State Banner */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 text-slate-300">
          <Database className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-heading">MongoDB Storage Module</h2>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Historical analysis tracking and persistent MongoDB log storage will be connected in Phase 7. Currently operating in Phase 1 setup mode.
        </p>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono-cyber">
          <span className="text-slate-500">DATABASE STATUS:</span>
          <span className="text-amber-400 font-semibold flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" />
            UNCONNECTED (PHASE 1)
          </span>
        </div>
      </div>
    </div>
  );
};
