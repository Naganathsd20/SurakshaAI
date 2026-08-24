import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquareCode, 
  Globe, 
  ShieldAlert, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { MOCK_HISTORY, MOCK_STATS } from '../data/mockData';
import { RiskLevelBadge } from '../components/RiskLevelBadge';

export const Dashboard = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);

  return (
    <div className="space-y-8 py-2">
      {/* Welcome & Dashboard Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-[#00ff66]" />
            Security Overview Dashboard
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Real-time phishing threat overview & quick diagnostic tools
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] self-start sm:self-auto">
          SURAKSHAAI OPERATIONAL
        </span>
      </div>

      {/* Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="cyber-card p-5 rounded-xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-slate-400">
            <span>TOTAL SCANNED</span>
            <TrendingUp className="w-4 h-4 text-[#00ff66]" />
          </div>
          <p className="text-3xl font-extrabold font-mono-cyber text-white">{MOCK_STATS.totalScanned}</p>
          <p className="text-[10px] text-slate-500 font-mono-cyber">Across {MOCK_STATS.languagesCovered} Indic languages</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-red-500/30 bg-red-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-red-400">
            <span>HIGH RISK SCAMS</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-3xl font-extrabold font-mono-cyber text-red-400">{MOCK_STATS.highRiskCount}</p>
          <p className="text-[10px] text-red-400/70 font-mono-cyber">Urgent action recommended</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-amber-400">
            <span>MEDIUM SUSPICION</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold font-mono-cyber text-amber-400">{MOCK_STATS.mediumRiskCount}</p>
          <p className="text-[10px] text-amber-400/70 font-mono-cyber">Caution advised</p>
        </div>

        <div className="cyber-card p-5 rounded-xl border border-[#00ff66]/30 bg-emerald-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono-cyber text-[#00ff66]">
            <span>SAFE VERIFIED</span>
            <ShieldCheck className="w-4 h-4 text-[#00ff66]" />
          </div>
          <p className="text-3xl font-extrabold font-mono-cyber text-[#00ff66]">{MOCK_STATS.safeCount}</p>
          <p className="text-[10px] text-[#00ff66]/70 font-mono-cyber">No threat anomalies</p>
        </div>
      </div>

      {/* Quick Analysis Trigger Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/analyze-message"
          className="cyber-card p-6 rounded-xl border border-slate-800 hover:border-[#00ff66]/50 transition-all group flex items-start justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] group-hover:scale-105 transition-transform">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-heading text-white group-hover:text-[#00ff66] transition-colors">
              Analyze Regional Message
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scan SMS, WhatsApp, or email messages in Hindi, Kannada, Tamil, Telugu, Marathi, Bengali, or English.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-[#00ff66] shrink-0 mt-1 transition-colors" />
        </Link>

        <Link
          to="/analyze-url"
          className="cyber-card p-6 rounded-xl border border-slate-800 hover:border-[#00ff66]/50 transition-all group flex items-start justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold font-heading text-white group-hover:text-[#00ff66] transition-colors">
              Analyze Web Link / URL
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Check web domain security, SSL verification status, typosquatting indicators, and redirection paths.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-[#00ff66] shrink-0 mt-1 transition-colors" />
        </Link>
      </div>

      {/* Recent Analysis Preview Table */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00ff66]" />
            <h2 className="text-base font-bold font-heading text-white">Recent Scans Preview</h2>
          </div>
          <Link
            to="/history"
            className="text-xs font-mono-cyber text-[#00ff66] hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL LOGS</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-cyber">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                <th className="py-2.5 px-3">TIMESTAMP</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">TITLE / PREVIEW</th>
                <th className="py-2.5 px-3">LANGUAGE</th>
                <th className="py-2.5 px-3">RISK SCORE</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {MOCK_HISTORY.slice(0, 4).map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40 text-slate-300">
                  <td className="py-3 px-3 text-slate-500 text-[11px] whitespace-nowrap">{item.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-white max-w-xs truncate">{item.title}</td>
                  <td className="py-3 px-3 text-slate-400">{item.language}</td>
                  <td className="py-3 px-3 font-bold">{item.riskScore} / 100</td>
                  <td className="py-3 px-3">
                    <RiskLevelBadge level={item.riskLevel} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedRecord(item)}
                      className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00ff66]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Security Tip */}
      <div className="cyber-card p-6 rounded-xl border border-slate-800/80 bg-slate-900/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-[#00ff66]/40 flex items-center justify-center text-[#00ff66] shrink-0">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold font-heading text-white">Daily Cyber Awareness Tip</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Banks in India will <strong>NEVER</strong> ask for your debit card PIN, net banking password, or OTP via SMS or phone call. If you receive an urgent request, do not respond and report it to <strong>1930</strong> immediately.
          </p>
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="cyber-card w-full max-w-lg p-6 rounded-xl border border-slate-800 space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold font-heading text-white">{selectedRecord.title}</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-xs font-mono-cyber text-slate-400 hover:text-white px-2 py-1 bg-slate-900 rounded"
              >
                CLOSE
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono-cyber">
              <p className="text-slate-400"><strong>Type:</strong> {selectedRecord.type}</p>
              <p className="text-slate-400"><strong>Language:</strong> {selectedRecord.language}</p>
              <p className="text-slate-400"><strong>Timestamp:</strong> {selectedRecord.timestamp}</p>
              <div className="p-3 rounded bg-slate-900/80 text-slate-200 font-sans border border-slate-800">
                "{selectedRecord.target}"
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">Risk Score: {selectedRecord.riskScore}/100</span>
                <RiskLevelBadge level={selectedRecord.riskLevel} size="md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
