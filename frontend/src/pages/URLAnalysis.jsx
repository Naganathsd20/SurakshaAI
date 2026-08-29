import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  CheckCircle2,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { PRESET_URLS } from '../data/mockData';
import { analyzeUrl } from '../services/api';
import { RiskScoreCard } from '../components/RiskScoreCard';
import { ThreatIndicators } from '../components/ThreatIndicators';
import { WeightedEvidence } from '../components/WeightedEvidence';
import { AnalysisExplanation } from '../components/AnalysisExplanation';
import { SafetyRecommendation } from '../components/SafetyRecommendation';

export const URLAnalysis = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePresetSelect = (preset) => {
    setInputUrl(preset.url);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setInputUrl('');
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsScanning(true);
    setAnalysisResult(null);
    setErrorMessage(null);

    // Call Real Backend REST API (POST /api/analyze/url)
    const response = await analyzeUrl({ url: inputUrl });

    setIsScanning(false);

    if (response.success && response.data) {
      setAnalysisResult({
        ...response.data,
        languageLabel: 'Global Web / URL'
      });
    } else {
      setErrorMessage(response.error ? `Backend Error: ${response.error}` : 'Unable to connect to backend server.');
    }
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#00ff66]" />
            URL & Web Risk Scanner
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            URL Heuristics, Protocol Checks & Phase 6 Risk Scoring Engine
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] shrink-0 self-start sm:self-auto">
          PHASE 6 — RISK SCORING & EXPLAINABILITY
        </span>
      </div>

      {/* Preset Sample Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-mono-cyber text-slate-400 font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>TRY SAMPLE WEB LINKS:</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_URLS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              type="button"
              className="min-h-[38px] px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#00ff66]/50 text-xs font-mono-cyber text-slate-300 hover:text-white transition-colors text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${preset.riskLevel === 'SAFE' ? 'bg-[#00ff66]' : 'bg-red-400'}`} />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleAnalyze} className="cyber-card p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4">
        <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#00ff66]" />
          <span>TARGET WEB LINK FOR RISK SCORING</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example-suspicious-link.com/login"
              className="w-full bg-[#05080e] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 font-mono-cyber transition-colors min-h-[44px]"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-3 text-xs text-slate-500 hover:text-red-400 p-1 min-h-[36px] flex items-center focus:outline-none focus:ring-2 focus:ring-red-400/50 rounded"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputUrl.trim() || isScanning}
            className={`min-h-[44px] px-6 py-3 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 shrink-0 transition-all focus:outline-none focus:ring-2 focus:ring-[#00ff66] ${
              !inputUrl.trim() || isScanning
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#00cc52] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
            }`}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>SCANNING URL...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>EVALUATE URL RISK</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <AlertCircle className="w-4 h-4 text-[#00ff66] shrink-0" />
          <span>Executes Phase 4 URL protocol checks & Phase 6 Risk Engine</span>
        </div>
      </form>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono-cyber flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Loading state indicator */}
      {isScanning && (
        <div className="cyber-card p-6 rounded-xl border border-[#00ff66]/30 space-y-3 text-center animate-pulse">
          <Loader2 className="w-8 h-8 text-[#00ff66] animate-spin mx-auto" />
          <p className="text-sm font-bold font-heading text-white">Running URL Risk Engine...</p>
          <p className="text-xs font-mono-cyber text-slate-400">Verifying IP host patterns, SSL status, and calculating weighted risk score</p>
        </div>
      )}

      {/* Result Section */}
      {analysisResult && !isScanning && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />
              URL Risk Assessment Report
            </h2>
            <span className="text-[10px] font-mono-cyber text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              PHASE 6 ENGINE OUTPUT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskScoreCard score={analysisResult.riskScore} riskLevel={analysisResult.riskLevel} />
            <ThreatIndicators
              indicators={analysisResult.indicators}
              evidenceList={analysisResult.evidenceList}
              riskLevel={analysisResult.riskLevel}
            />
          </div>

          {analysisResult.weightedEvidence && (
            <WeightedEvidence
              weightedEvidence={analysisResult.weightedEvidence}
              scoringBreakdown={analysisResult.scoringBreakdown}
            />
          )}

          <AnalysisExplanation
            explanation={analysisResult.explanation}
            languageLabel={analysisResult.languageLabel}
          />

          <SafetyRecommendation recommendations={analysisResult.recommendations} />
        </div>
      )}
    </div>
  );
};
