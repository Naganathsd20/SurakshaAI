import React, { useState } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  RefreshCw, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { MOCK_HISTORY } from '../data/mockData';
import { RiskLevelBadge } from '../components/RiskLevelBadge';

export const History = () => {
  const [historyList, setHistoryList] = useState(MOCK_HISTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredHistory = historyList.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.target.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || item.riskLevel === riskFilter;
    const matchesType = typeFilter === 'ALL' || item.type.toUpperCase() === typeFilter;
    return matchesSearch && matchesRisk && matchesType;
  });

  const handleClearHistory = () => {
    setHistoryList([]);
  };

  const handleResetHistory = () => {
    setHistoryList(MOCK_HISTORY);
  };

  return (
    <div className="space-y-6 py-2">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <HistoryIcon className="w-6 h-6 text-[#00ff66]" />
            Analysis History Log
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Historical log of scanned regional messages and web addresses
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {historyList.length > 0 ? (
            <button
              onClick={handleClearHistory}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono-cyber text-slate-400 hover:text-red-400 flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>CLEAR LOGS</span>
            </button>
          ) : (
            <button
              onClick={handleResetHistory}
              className="px-3 py-1.5 rounded bg-emerald-950 border border-[#00ff66]/30 text-xs font-mono-cyber text-[#00ff66] flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESTORE MOCK DATA</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="cyber-card p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by keyword..."
            className="w-full bg-[#05080e] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs font-mono-cyber text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff66]/50"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#00ff66]" />
            <span className="text-[11px] font-mono-cyber text-slate-400">RISK:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-[#05080e] border border-slate-800 rounded px-2.5 py-1 text-xs font-mono-cyber text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="HIGH">High Risk Only</option>
              <option value="MEDIUM">Medium Risk Only</option>
              <option value="SAFE">Safe Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-cyber text-slate-400">TYPE:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#05080e] border border-slate-800 rounded px-2.5 py-1 text-xs font-mono-cyber text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Scan Types</option>
              <option value="MESSAGE">Messages Only</option>
              <option value="URL">URLs Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List Table / Cards */}
      {filteredHistory.length === 0 ? (
        <div className="cyber-card p-12 rounded-xl border border-slate-800 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold font-heading text-slate-300">No History Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono-cyber">
            No scan logs match your current search and filter settings, or the history log has been cleared.
          </p>
          {historyList.length === 0 && (
            <button
              onClick={handleResetHistory}
              className="px-4 py-2 rounded bg-emerald-950 border border-[#00ff66]/40 text-xs font-mono-cyber text-[#00ff66] inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>LOAD SAMPLE MOCK LOGS</span>
            </button>
          )}
        </div>
      ) : (
        <div className="cyber-card rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-cyber">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                  <th className="py-3 px-4">TIMESTAMP</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">TITLE & PREVIEW</th>
                  <th className="py-3 px-4">LANGUAGE</th>
                  <th className="py-3 px-4">SCORE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 text-slate-300 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">{item.timestamp}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="font-bold text-white truncate">{item.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{item.target}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{item.language}</td>
                    <td className="py-3.5 px-4 font-bold">{item.riskScore} / 100</td>
                    <td className="py-3.5 px-4">
                      <RiskLevelBadge level={item.riskLevel} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
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
      )}

      {/* Record Detail Modal */}
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

            <div className="space-y-3 text-xs font-mono-cyber">
              <div className="flex items-center justify-between text-slate-400">
                <span>Type: {selectedRecord.type}</span>
                <span>Language: {selectedRecord.language}</span>
              </div>
              <p className="text-slate-500 text-[11px]">Timestamp: {selectedRecord.timestamp}</p>
              
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-sans leading-relaxed">
                "{selectedRecord.target}"
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400">Risk Score: <strong className="text-white">{selectedRecord.riskScore}/100</strong></span>
                <RiskLevelBadge level={selectedRecord.riskLevel} size="md" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
