const { detectUrlIndicators } = require('./detection/urlDetector');
const { calculateRiskAssessment } = require('./risk/scoringEngine');

/**
 * URL Analysis Service (Phase 6 Integration)
 * Evaluates URL heuristics via Phase 4 engine and applies Phase 6 Risk Scoring Engine.
 */
const analyzeUrlService = async (url = '') => {
  const trimmedUrl = (url || '').trim();

  // Execute Phase 4 Rule-Based URL Detector
  const phase4Result = detectUrlIndicators(trimmedUrl);

  // Execute Phase 6 Risk Assessment Engine
  const riskAssessment = calculateRiskAssessment({
    phase4Indicators: phase4Result,
    intentSignals: [],
    inputType: 'url'
  });

  const indicatorsFormatted = phase4Result.evidenceList.map(item => `${item.label} (${item.evidence})`);

  return {
    inputType: 'url',
    url: trimmedUrl,
    detected: phase4Result.detected,
    indicatorCount: phase4Result.indicatorCount,
    evidenceList: phase4Result.evidenceList,
    indicators: indicatorsFormatted.length > 0 ? indicatorsFormatted : ['No threat indicators detected'],
    riskScore: riskAssessment.riskScore,
    riskLevel: riskAssessment.riskLevel,
    result: riskAssessment.result,
    weightedEvidence: riskAssessment.weightedEvidence,
    explanation: riskAssessment.explanation,
    recommendations: riskAssessment.recommendations,
    scoringBreakdown: riskAssessment.scoringBreakdown,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeUrlService
};
