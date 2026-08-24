/**
 * Risk Assessment Service Interface (Phase 3 Foundation)
 * Accepts a type ('message' or 'url') and payload to establish the API contract for risk scoring.
 * Note: Real risk-scoring algorithms & explainability engine will extend this interface in Phase 6.
 */

const assessRiskService = async (type, payload = {}) => {
  const normalizedType = String(type).toLowerCase();

  const isMessage = normalizedType === 'message';
  const text = payload.text || payload.url || '';
  const length = String(text).length;

  return {
    assessmentType: normalizedType,
    contractVersion: '1.0-PHASE3',
    evaluatedLength: length,
    overallRiskScore: length > 30 ? 85 : 15,
    overallRiskLevel: length > 30 ? 'HIGH' : 'SAFE',
    scoringBreakdown: {
      urgencyScore: length > 30 ? 40 : 5,
      brandImpersonationScore: length > 30 ? 30 : 5,
      domainRiskScore: length > 30 ? 15 : 5
    },
    meta: {
      status: 'API Contract Verified',
      engineReadyForPhase6: true
    },
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  assessRiskService
};
