const { detectLanguageAndScript } = require('./language/languageProcessor');
const { analyzeNlp } = require('./nlp/nlpService');
const { detectMessageIndicators } = require('./detection/messageDetector');
const { calculateRiskAssessment } = require('./risk/scoringEngine');

/**
 * Message Analysis Service (Phase 6 Integration)
 * Pipeline:
 *   1. Language Processing & Script Identification (Phase 5)
 *   2. NLP Phishing Intent Analysis (Phase 5)
 *   3. Phase 4 Rule-Based Security Indicators (Phase 4)
 *   4. Phase 6 Risk Scoring & Explainability Engine (Phase 6)
 */
const analyzeMessageService = async (text = '', userSelectedLang = 'hi') => {
  const trimmed = (text || '').trim();
  const length = trimmed.length;

  // 1. Language Pre-Processing & Script Detection
  const language = detectLanguageAndScript(trimmed, userSelectedLang);

  // 2. NLP / Intent Analysis Layer
  const nlpResult = await analyzeNlp(trimmed, language);

  // 3. Phase 4 Rule-Based Security Indicator Engine
  const phase4Result = detectMessageIndicators(trimmed);

  // 4. Phase 6 Weighted Risk Scoring & Explainability Engine
  const riskAssessment = calculateRiskAssessment({
    phase4Indicators: phase4Result,
    intentSignals: nlpResult.intentSignals,
    inputType: 'message'
  });

  return {
    inputType: 'message',
    originalText: trimmed,
    processedText: trimmed.substring(0, 100) + (length > 100 ? '...' : ''),
    textLength: length,
    language,
    riskScore: riskAssessment.riskScore,
    riskLevel: riskAssessment.riskLevel,
    result: riskAssessment.result,
    weightedEvidence: riskAssessment.weightedEvidence,
    explanation: riskAssessment.explanation,
    recommendations: riskAssessment.recommendations,
    scoringBreakdown: riskAssessment.scoringBreakdown,
    intentSignals: nlpResult.intentSignals,
    nlpAnalysis: nlpResult.nlpAnalysis,
    phase4Indicators: {
      type: phase4Result.type,
      detected: phase4Result.detected,
      indicatorCount: phase4Result.indicatorCount,
      evidenceList: phase4Result.evidenceList
    },
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeMessageService
};
