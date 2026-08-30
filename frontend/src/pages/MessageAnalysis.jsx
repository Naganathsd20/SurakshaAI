import React, { useState } from 'react';
import { 
  MessageSquareCode, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Loader2, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PRESET_MESSAGES } from '../data/mockData';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { analyzeMessage } from '../services/api';
import { RiskScoreCard } from '../components/RiskScoreCard';
import { LanguageMetaBadge } from '../components/LanguageMetaBadge';
import { IntentSignals } from '../components/IntentSignals';
import { WeightedEvidence } from '../components/WeightedEvidence';
import { ThreatIndicators } from '../components/ThreatIndicators';
import { AnalysisExplanation } from '../components/AnalysisExplanation';
import { SafetyRecommendation } from '../components/SafetyRecommendation';

export const MessageAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [selectedLang, setSelectedLang] = useState('hi');
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePresetSelect = (preset) => {
    setInputText(preset.text);
    setSelectedLang(preset.language);
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsScanning(true);
    setAnalysisResult(null);
    setErrorMessage(null);

    // Call Real Backend REST API (POST /api/analyze/message)
    const response = await analyzeMessage({ text: inputText, language: selectedLang });

    setIsScanning(false);

    if (response.success && response.data) {
      setAnalysisResult(response.data);
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
            <MessageSquareCode className="w-6 h-6 text-[#00ff66]" />
            Regional Message & Risk Analyzer
          </h1>
          <p className="text-xs text-slate-400 font-mono-cyber mt-1">
            Language Pre-Processing, NLP Intent Engine, Threat Rules & AI Risk Scoring Engine
          </p>
        </div>
        <span className="text-[11px] font-mono-cyber px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[#00ff66] shrink-0">
          AI RISK ANALYSIS
        </span>
      </div>

      {/* Preset Sample Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-mono-cyber text-slate-400 font-semibold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00ff66]" />
          <span>TRY SAMPLE REGIONAL MESSAGES:</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESET_MESSAGES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              type="button"
              className="min-h-[38px] px-3.5 py-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-[#00ff66]/50 text-xs font-mono-cyber text-slate-300 hover:text-white transition-colors text-left flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50"
            >
              <span className="w-2 h-2 rounded-full bg-[#00ff66] shrink-0" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Box */}
      <form onSubmit={handleAnalyze} className="cyber-card p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="text-xs font-mono-cyber text-slate-300 font-semibold flex items-center gap-2">
            <span>PASTE REGIONAL MESSAGE FOR RISK EVALUATION</span>
          </label>

          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono-cyber text-slate-500 shrink-0">INTENDED SCRIPT:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="w-full sm:w-auto bg-[#05080e] border border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono-cyber text-[#00ff66] focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50"
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
            placeholder="Paste suspicious SMS, WhatsApp message, or email snippet in Hindi, Kannada, Marathi, Tamil, Telugu, Bengali, Hinglish or English..."
            className="w-full bg-[#05080e] border border-slate-800 rounded-lg p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#00ff66]/50 transition-colors font-sans leading-relaxed resize-y"
          />
          <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono-cyber text-slate-500">
            <span>{inputText.length} / 5000 chars</span>
            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-red-400 flex items-center gap-1.5 min-h-[36px] px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400/50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR</span>
              </button>
            )}
          </div>
        </div>

        {/* Submit & Guidance */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-[#00ff66] shrink-0" />
            <span>Executes real-time AI Risk Scoring & Explainability Engine</span>
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() || isScanning}
            className={`min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#00ff66] text-black font-bold text-xs font-mono-cyber flex items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#00ff66] ${
              !inputText.trim() || isScanning
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#00cc52] shadow-[0_0_15px_rgba(0,255,102,0.3)]'
            }`}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-black" />
                <span>RUNNING RISK ENGINE...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>EVALUATE RISK</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-mono-cyber flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Interactive Scan Progress Indicator */}
      {isScanning && (
        <div className="cyber-card p-6 rounded-xl border border-[#00ff66]/30 space-y-3 text-center animate-pulse">
          <Loader2 className="w-8 h-8 text-[#00ff66] animate-spin mx-auto" />
          <p className="text-sm font-bold font-heading text-white">Calculating Weighted Risk & Explainability...</p>
          <p className="text-xs font-mono-cyber text-slate-400">Aggregating security rules and NLP intent signals through AI scoring engine</p>
        </div>
      )}

      {/* Analysis Result Section */}
      {analysisResult && !isScanning && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00ff66]" />
              Security Risk Assessment Report
            </h2>
            <span className="text-[10px] font-mono-cyber text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              AI RISK & EXPLAINABILITY REPORT
            </span>
          </div>

          {/* 1. Risk Score Card */}
          <RiskScoreCard score={analysisResult.riskScore} riskLevel={analysisResult.riskLevel} />

          {/* 2. Language Metadata Card */}
          <LanguageMetaBadge language={analysisResult.language} />

          {/* 3. Weighted Evidence Breakdown */}
          <WeightedEvidence
            weightedEvidence={analysisResult.weightedEvidence}
            scoringBreakdown={analysisResult.scoringBreakdown}
          />

          {/* 4. NLP Intent Signals Card */}
          <IntentSignals
            intentSignals={analysisResult.intentSignals}
            nlpAnalysis={analysisResult.nlpAnalysis}
          />

          {/* 5. Threat Rule Indicators Card */}
          <ThreatIndicators
            indicators={analysisResult.phase4Indicators?.evidenceList?.map(e => `${e.label} (${e.evidence})`) || []}
            evidenceList={analysisResult.phase4Indicators?.evidenceList || []}
          />

          {/* 6. Contextual Explanation */}
          <AnalysisExplanation
            explanation={analysisResult.explanation}
            languageLabel={analysisResult.language?.name || selectedLang}
          />

          {/* 7. Safety Recommendations */}
          <SafetyRecommendation recommendations={analysisResult.recommendations} />
        </div>
      )}
    </div>
  );
};
