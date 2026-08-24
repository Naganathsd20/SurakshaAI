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
  ExternalLink
} from 'lucide-react';
import { PRESET_URLS } from '../data/mockData';
import { RiskScoreCard } from '../components/RiskScoreCard';
import { ThreatIndicators } from '../components/ThreatIndicators';
import { AnalysisExplanation } from '../components/AnalysisExplanation';
import { SafetyRecommendation } from '../components/SafetyRecommendation';

export const URLAnalysis = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handlePresetSelect = (preset) => {
    setInputUrl(preset.url);
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setInputUrl('');
    setAnalysisResult(null);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate URL heuristic scanning delay
    setTimeout(() => {
      const matched = PRESET_URLS.find(u => inputUrl.toLowerCase().includes(u.url.toLowerCase())) || {
        riskLevel: 'HIGH',
        riskScore: 91,
        indicators: [
          'Unverified Non-Standard Domain',
          'Potential Typosquatting Brand Spoofing',
          'Missing SSL Certificate / Non-HTTPS Protocol',
          'Suspicious URL Query Structure'
        ],
        explanation: 'The target web address exhibits strong domain spoofing indicators. The domain registration does not match official corporate or government records.',
        recommendations: [
          'Do NOT visit this link or enter personal credentials.',
          'Always check that banking portals use secure HTTPS and official domain extensions (.com, .co.in, .gov.in).',
          'Report the suspicious link to cybercrime authorities.'
        ]
      };

      setAnalysisResult({
        ...matched,
        languageLabel: 'Global Web / URL'
      });
      setIsScanning(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 py-2 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white flex items-center gap-3">
            <Globe className="w-6 h-6 text-[#00ff66]" />
            URL & Web Heuristic Scanner
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Detect domain typosquatting, suspicious TLDs, missing SSL, and phishing links
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66]">
          PHASE 2 DEMO
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
              className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#00ff66]/50 text-xs font-mono-cyber text-slate-300 hover:text-white transition-colors text-left flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${preset.riskLevel === 'SAFE' ? 'bg-[#00ff66]' : 'bg-red-400'}`} />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleAnalyze} className="cyber-card p-6 rounded-xl border border-slate-800 space-y-4">
        <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#00ff66]" />
          <span>TARGET WEB LINK FOR HEURISTIC SCANNERS</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://example-suspicious-link.com/login"
              className="w-full bg-[#05080e] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff66]/50 font-mono-cyber transition-colors"
            />
            {inputUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-3.5 text-xs text-slate-500 hover:text-red-400"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputUrl.trim() || isScanning}
            className={`px-6 py-3 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 shrink-0 transition-all ${
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
                <span>SCAN URL</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Evaluating domain structure, SSL security certificates, and redirection risk</span>
        </div>
      </form>

      {/* Loading state indicator */}
      {isScanning && (
        <div className="cyber-card p-6 rounded-xl border border-[#00ff66]/30 space-y-3 text-center animate-pulse">
          <Loader2 className="w-8 h-8 text-[#00ff66] animate-spin mx-auto" />
          <p className="text-sm font-bold font-heading text-white">Tracing Domain Heuristics & SSL Status...</p>
          <p className="text-xs font-mono-cyber text-slate-400">Verifying web host validity & typosquatting risks</p>
        </div>
      )}

      {/* Mock Result Section */}
      {analysisResult && !isScanning && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />
              URL Diagnostic Report
            </h2>
            <span className="text-[10px] font-mono-cyber text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              MOCK SIMULATED DATA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskScoreCard score={analysisResult.riskScore} riskLevel={analysisResult.riskLevel} />
            <ThreatIndicators indicators={analysisResult.indicators} riskLevel={analysisResult.riskLevel} />
          </div>

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
