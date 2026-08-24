const { detectMessageIndicators } = require('./detection/messageDetector');

/**
 * Message Analysis Service (Phase 4 Detection Integration)
 * Runs real deterministic rule-based phishing detection on text input.
 */
const analyzeMessageService = async (text, language = 'hi') => {
  const trimmed = text.trim();
  const length = trimmed.length;

  // Execute Real Phase 4 Rule-Based Message Detector
  const detectionResult = detectMessageIndicators(trimmed);

  // Format indicator strings for UI compatibility
  const indicatorsFormatted = detectionResult.evidenceList.map(item => `${item.label} (${item.evidence})`);

  // Simple compatibility risk scoring (Phase 6 will own final weighted algorithm)
  const isHighRisk = detectionResult.evidenceList.some(item => item.severity === 'high');
  const indicatorCount = detectionResult.indicatorCount;

  let riskLevel = 'SAFE';
  let riskScore = 5;
  let explanation = 'No phishing indicators or urgency threats were detected in the submitted message text.';

  if (indicatorCount > 0) {
    if (isHighRisk || indicatorCount >= 2) {
      riskLevel = 'HIGH';
      riskScore = Math.min(70 + (indicatorCount * 8), 98);
      explanation = `Real detection engine identified ${indicatorCount} security indicator(s) including high-severity urgency, threat, or credential harvesting patterns.`;
    } else {
      riskLevel = 'MEDIUM';
      riskScore = Math.min(45 + (indicatorCount * 10), 69);
      explanation = `Real detection engine identified ${indicatorCount} moderate security indicator(s). Caution is recommended.`;
    }
  }

  // Generate actionable recommendations based on detected codes
  const recommendations = [];
  if (detectionResult.evidenceList.some(e => e.code === 'OTP_REQUEST' || e.code === 'PIN_PASSWORD_REQUEST')) {
    recommendations.push('NEVER share your OTP, PIN, or net banking password with anyone.');
  }
  if (detectionResult.evidenceList.some(e => e.code === 'SUSPICIOUS_LINK_PROMPT')) {
    recommendations.push('Do NOT click any web links embedded in this message.');
  }
  if (detectionResult.evidenceList.some(e => e.code === 'BANK_IMPERSONATION' || e.code === 'ACCOUNT_CLOSURE_THREAT')) {
    recommendations.push('Verify account status directly through your official banking portal or customer service.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Always exercise caution when receiving unsolicited messages from unknown senders.');
    recommendations.push('Report suspicious financial scams to national cyber crime portal (1930).');
  }

  return {
    inputType: 'message',
    processedText: trimmed.substring(0, 100) + (length > 100 ? '...' : ''),
    textLength: length,
    language: language || 'auto',
    detected: detectionResult.detected,
    indicatorCount: detectionResult.indicatorCount,
    evidenceList: detectionResult.evidenceList,
    indicators: indicatorsFormatted.length > 0 ? indicatorsFormatted : ['No threat indicators detected'],
    riskScore,
    riskLevel,
    result: riskLevel === 'HIGH' ? 'SUSPICIOUS_PHISHING' : riskLevel === 'MEDIUM' ? 'MODERATE_CAUTION' : 'LIKELY_SAFE',
    explanation,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeMessageService
};
