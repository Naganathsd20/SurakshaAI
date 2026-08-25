const { calculateRiskAssessment } = require('./risk/scoringEngine');
const { detectMessageIndicators } = require('./detection/messageDetector');
const { detectUrlIndicators } = require('./detection/urlDetector');

/**
 * Risk Assessment Service (Phase 6 Engine Integration)
 * Directly evaluates input payloads against Phase 6 Risk Scoring Engine.
 */
const assessRiskService = async (type = 'message', payload = {}) => {
  const normalizedType = String(type).toLowerCase();
  const text = payload.text || payload.url || '';
  const trimmed = text.trim();

  let phase4Indicators = { detected: false, indicatorCount: 0, evidenceList: [] };
  if (normalizedType === 'url') {
    phase4Indicators = detectUrlIndicators(trimmed);
  } else {
    phase4Indicators = detectMessageIndicators(trimmed);
  }

  const intentSignals = payload.intentSignals || [];

  const assessment = calculateRiskAssessment({
    phase4Indicators,
    intentSignals,
    inputType: normalizedType
  });

  return {
    assessmentType: normalizedType,
    contractVersion: '2.0-PHASE6',
    evaluatedLength: trimmed.length,
    overallRiskScore: assessment.riskScore,
    overallRiskLevel: assessment.riskLevel,
    result: assessment.result,
    weightedEvidence: assessment.weightedEvidence,
    explanation: assessment.explanation,
    recommendations: assessment.recommendations,
    scoringBreakdown: assessment.scoringBreakdown,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  assessRiskService
};
