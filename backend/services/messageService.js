const { detectLanguageAndScript } = require('./language/languageProcessor');
const { analyzeNlp } = require('./nlp/nlpService');
const { detectMessageIndicators } = require('./detection/messageDetector');

/**
 * Message Analysis Service (Phase 5 AI/NLP & Regional Languages Integration)
 * Integrates:
 *   1. Language Processing & Script Identification
 *   2. NLP Phishing Intent Analysis (Gemini / Local Engine)
 *   3. Phase 4 Rule-Based Security Indicators
 *
 * NOTE (Phase 6 Boundary): This service strictly DOES NOT calculate or return
 * any riskScore or riskLevel. Final score aggregation is owned by Phase 6.
 */
const analyzeMessageService = async (text = '', userSelectedLang = 'hi') => {
  const trimmed = (text || '').trim();
  const length = trimmed.length;

  // 1. Language Processing & Script Detection
  const language = detectLanguageAndScript(trimmed, userSelectedLang);

  // 2. NLP / Intent Analysis Layer
  const nlpResult = await analyzeNlp(trimmed, language);

  // 3. Phase 4 Rule-Based Security Indicator Engine (Preserved Standalone)
  const phase4Result = detectMessageIndicators(trimmed);

  return {
    inputType: 'message',
    originalText: trimmed,
    processedText: trimmed.substring(0, 100) + (length > 100 ? '...' : ''),
    textLength: length,
    language,
    intentSignals: nlpResult.intentSignals,
    nlpAnalysis: nlpResult.nlpAnalysis,
    phase4Indicators: {
      type: phase4Result.type,
      detected: phase4Result.detected,
      indicatorCount: phase4Result.indicatorCount,
      evidenceList: phase4Result.evidenceList
    },
    explanation: nlpResult.explanation,
    recommendations: nlpResult.recommendations,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeMessageService
};
