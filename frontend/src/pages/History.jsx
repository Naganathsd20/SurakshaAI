import React, { useState, useEffect, useCallback } from 'react';
import { 
  History as HistoryIcon, 
  Search, 
  Filter, 
  Eye, 
  RefreshCw, 
  AlertCircle,
  FileText,
  Loader2,
  Database,
  Globe,
  BrainCircuit,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { fetchHistory } from '../services/api';
import { RiskLevelBadge } from '../components/RiskLevelBadge';

export const History = () => {
  const [historyList, setHistoryList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDbConnected, setIsDbConnected] = useState(true);

  const loadHistoryData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const response = await fetchHistory({
      riskLevel: riskFilter,
      type: typeFilter,
      search: searchTerm,
      page: 1,
      limit: 50
    });

    setIsLoading(false);

    if (response.success && response.data) {
      const { records = [], totalRecords = 0, isDbConnected: dbStatus = true } = response.data;
      setHistoryList(records);
      setTotalCount(totalRecords);
      setIsDbConnected(dbStatus);
    } else {
      setErrorMessage(response.error || 'Failed to fetch scan history from server.');
    }
  }, [riskFilter, typeFilter, searchTerm]);

  useEffect(() => {
    loadHistoryData();
  }, [loadHistoryData]);

  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    try {
      const d = new Date(isoStr);
      return d.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
    } catch {
      return String(isoStr);
    }
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
            Persistent log of scanned regional messages and web links
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={loadHistoryData}
            disabled={isLoading}
            className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:border-[#00ff66]/40 text-xs font-mono-cyber text-slate-300 hover:text-[#00ff66] flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#00ff66]' : ''}`} />
            <span>REFRESH LOGS</span>
          </button>
        </div>
      </div>

      {/* Database Connection Warning Banner if Offline */}
      {!isDbConnected && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono-cyber flex items-center gap-2">
          <Database className="w-4 h-4 text-amber-400 shrink-0" />
          <span>MongoDB Persistence Offline: Configure MONGODB_URI in backend environment variables to enable persistent history storage.</span>
        </div>
      )}

      {/* Error State Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono-cyber flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Filter Controls Bar */}
      <div className="cyber-card p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by keyword..."
            className="w-full bg-[#05080e] border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs font-mono-cyber text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 min-h-[40px]"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#00ff66]" />
              <span className="text-[11px] font-mono-cyber text-slate-400">RISK:</span>
            </div>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="bg-[#05080e] border border-slate-800 rounded px-3 py-1.5 text-xs font-mono-cyber text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 min-h-[36px]"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="HIGH">High Risk Only</option>
              <option value="MEDIUM">Medium Risk Only</option>
              <option value="SAFE">Safe Only</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[11px] font-mono-cyber text-slate-400">TYPE:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#05080e] border border-slate-800 rounded px-3 py-1.5 text-xs font-mono-cyber text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 min-h-[36px]"
            >
              <option value="ALL">All Scan Types</option>
              <option value="MESSAGE">Messages Only</option>
              <option value="URL">URLs Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="cyber-card p-12 rounded-xl border border-slate-800 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-[#00ff66] animate-spin mx-auto" />
          <p className="text-xs font-mono-cyber text-slate-400">Fetching scan records from MongoDB database...</p>
        </div>
      ) : historyList.length === 0 ? (
        /* Empty History State */
        <div className="cyber-card p-12 rounded-xl border border-slate-800 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold font-heading text-slate-300">No Scan Records Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono-cyber">
            {totalCount === 0 
              ? "No scan history records exist in the database yet. Perform a message or URL scan to persist your first record."
              : "No logs match your current search and filter settings."
            }
          </p>
        </div>
      ) : (
        /* History Records Table */
        <div className="cyber-card rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-cyber">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                  <th className="py-3 px-4">TIMESTAMP</th>
                  <th className="py-3 px-4">TYPE</th>
                  <th className="py-3 px-4">PREVIEW / TARGET</th>
                  <th className="py-3 px-4">LANGUAGE / SCRIPT</th>
                  <th className="py-3 px-4">SCORE</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4 text-right">DETAILS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {historyList.map((item) => {
                  const targetText = item.originalText || item.url || item.processedText || 'N/A';
                  const langName = item.language?.name || item.language?.code || 'N/A';
                  const scriptType = item.language?.scriptType || 'N/A';

                  return (
                    <tr key={item._id || item.id} className="hover:bg-slate-900/40 text-slate-300 transition-colors">
                      <td className="py-3.5 px-4 text-slate-500 text-[11px] whitespace-nowrap">{formatDate(item.timestamp)}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 font-bold uppercase">
                          {item.inputType || 'message'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="text-white truncate font-sans text-xs">{targetText}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                        <span>{langName}</span>
                        {scriptType !== 'N/A' && (
                          <span className="text-[10px] text-slate-500 block">{scriptType}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                        {item.riskScore} / 100
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <RiskLevelBadge level={item.riskLevel} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedRecord(item)}
                          className="min-w-[36px] min-h-[36px] p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#00ff66] border border-slate-800 transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50"
                          title="View Complete Report"
                          aria-label="View Complete Scan Report"
                        >
                          <Eye className="w-4 h-4 text-[#00ff66]" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Scan Record Detail Modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedRecord(null);
          }}
        >
          <div className="cyber-card w-full max-w-2xl p-4 sm:p-6 rounded-xl border border-slate-800 space-y-5 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00ff66]" />
                <h3 className="text-base font-bold font-heading text-white">Scan Record Details</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="min-h-[36px] text-xs font-mono-cyber text-slate-400 hover:text-white px-3 py-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 transition-colors"
                aria-label="Close modal details"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono-cyber">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#05080e] p-3 rounded-lg border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">TYPE</span>
                  <span className="font-bold text-white uppercase">{selectedRecord.inputType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">RISK SCORE</span>
                  <span className="font-bold text-[#00ff66]">{selectedRecord.riskScore}/100</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">RISK LEVEL</span>
                  <span className="font-bold text-amber-400">{selectedRecord.riskLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TIMESTAMP</span>
                  <span className="text-[11px] text-slate-300">{formatDate(selectedRecord.timestamp)}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">SCANNED INPUT:</span>
                <div className="p-3 rounded-lg bg-[#05080e] border border-slate-800 text-slate-200 font-sans leading-relaxed break-words">
                  "{selectedRecord.originalText || selectedRecord.url}"
                </div>
              </div>

              {/* Language Metadata */}
              {selectedRecord.language && selectedRecord.language.name && (
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Globe className="w-4 h-4 text-[#00ff66]" />
                    <span>Language: <strong>{selectedRecord.language.name}</strong></span>
                  </div>
                  <span className="text-[10px] text-cyan-400">Script: {selectedRecord.language.scriptType}</span>
                </div>
              )}

              {/* Risk Assessment Explanation */}
              {selectedRecord.explanation && (
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">EXPLANATION NARRATIVE:</span>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {selectedRecord.explanation}
                  </div>
                </div>
              )}

              {/* Weighted Evidence */}
              {selectedRecord.weightedEvidence && selectedRecord.weightedEvidence.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] text-slate-400 font-bold block">WEIGHTED EVIDENCE ({selectedRecord.weightedEvidence.length}):</span>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {selectedRecord.weightedEvidence.map((ev, idx) => (
                      <div key={idx} className="p-2 rounded bg-[#05080e] border border-slate-800/80 flex items-center justify-between text-[11px]">
                        <div>
                          <span className="font-bold text-white">{ev.label}</span>
                          <span className="text-[10px] text-slate-500 block">{ev.evidence}</span>
                        </div>
                        <span className="text-[#00ff66] font-bold">+{ev.weight} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {selectedRecord.recommendations && selectedRecord.recommendations.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold block">SAFETY RECOMMENDATIONS:</span>
                  <ul className="list-disc pl-4 space-y-0.5 text-slate-300">
                    {selectedRecord.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
