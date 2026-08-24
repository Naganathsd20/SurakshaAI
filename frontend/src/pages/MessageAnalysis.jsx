import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { PRESET_MESSAGES } from '../data/mockData';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { RiskScoreCard } from '../components/RiskScoreCard';
import { ThreatIndicators } from '../components/ThreatIndicators';
import { AnalysisExplanation } from '../components/AnalysisExplanation';
import { SafetyRecommendation } from '../components/SafetyRecommendation';

export const MessageAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('hi');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handlePresetSelect = (preset) => {
    setInputText(preset.text);
    setSelectedLang(preset.language);
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsScanning(true);
    setAnalysisResult(null);

    // Simulate multi-layer scanning delay
    setTimeout(() => {
      // Find matching preset or generate default mock result
      const matched = PRESET_MESSAGES.find(p => inputText.toLowerCase().includes(p.text.substring(0, 15).toLowerCase())) || {
        riskLevel: 'HIGH',
        riskScore: 87,
        indicators: [
          'Unverified Urgent Action Pattern',
          'Suspicious External Link Detected',
          'Financial Credential Harvesting Pattern'
        ],
        explanation: 'The submitted message contains high-urgency keywords combined with an unverified external link requiring immediate user action. This pattern strongly matches regional financial phishing tactics.',
        recommendations: [
          'Do NOT click any links provided in this message.',
          'Verify the message directly with the official service provider.',
          'Never share OTPs, PINs, or net banking credentials.'
        ]
      };

      const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang);

      setAnalysisResult({
        ...matched,
        languageLabel: currentLangObj ? currentLangObj.name : 'Auto-Detected Script'
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
            <MessageSquareCode className="w-6 h-6 text-[#00ff66]" />
            Regional Message Analyzer
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Detect phishing, UPI fraud, and urgency traps in Indic regional scripts
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
          <span>TRY SAMPLE SUSPICIOUS MESSAGES:</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_MESSAGES.map((preset) => (
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
            <span>PASTE MESSAGE TEXT FOR SCANNERS</span>
          </label>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-cyber text-slate-500">SCRIPT:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-[#05080e] border border-slate-800 rounded-md px-3 py-1 text-xs font-mono-cyber text-[#00ff66] focus:outline-none focus:border-[#00ff66]/50"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            placeholder="Paste suspicious SMS, WhatsApp message, or email snippet here (e.g. प्रिय ग्राहक, आपका SBI खाता बंद हो जाएगा...)"
            className="w-full bg-[#05080e] border border-slate-800 rounded-lg p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#00ff66]/50 transition-colors font-sans leading-relaxed"
          />
          <div className="absolute bottom-3 right-3 flex items-center gap-3 text-[11px] font-mono-cyber text-slate-500">
            <span>{inputText.length} characters</span>
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-red-400 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>CLEAR</span>
              </button>
            )}
          </div>
        </div>

        {/* Submit & Guidance */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#00ff66] shrink-0" />
            <span>Scanning regional language syntax, urgency triggers, and domain risk</span>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isScanning}
            className={`px-6 py-2.5 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 transition-all ${
              !inputText.trim() || isScanning
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#00cc52] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
            }`}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>SCANNING MESSAGE...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>ANALYZE MESSAGE</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Interactive Scan Progress Indicator */}
      {isScanning && (
        <div className="cyber-card p-6 rounded-xl border border-[#00ff66]/30 space-y-3 text-center animate-pulse">
          <Loader2 className="w-8 h-8 text-[#00ff66] animate-spin mx-auto" />
          <p className="text-sm font-bold font-heading text-white">Evaluating Regional Phishing Patterns...</p>
          <p className="text-xs font-mono-cyber text-slate-400">Checking Indic syntax heuristics & domain safety</p>
        </div>
      )}

      {/* Analysis Result Section */}
      {analysisResult && !isScanning && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />
              Analysis Diagnostic Report
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
