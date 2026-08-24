const { detectUrlIndicators } = require('./detection/urlDetector');

/**
 * URL Analysis Service (Phase 4 Detection Integration)
 * Runs real deterministic rule-based URL detection on web links.
 */
const analyzeUrlService = async (url) => {
  const trimmedUrl = url.trim();

  // Execute Real Phase 4 Rule-Based URL Detector
  const detectionResult = detectUrlIndicators(trimmedUrl);

  // Format indicator strings for UI compatibility
  const indicatorsFormatted = detectionResult.evidenceList.map(item => `${item.label} (${item.evidence})`);

  const indicatorCount = detectionResult.indicatorCount;
  const isHighRisk = detectionResult.evidenceList.some(item => item.severity === 'high');

  let riskLevel = 'SAFE';
  let riskScore = 2;
  let explanation = 'Target URL exhibits safe protocol and standard domain structure with no threat indicators detected.';

  if (indicatorCount > 0) {
    if (isHighRisk || indicatorCount >= 2) {
      riskLevel = 'HIGH';
      riskScore = Math.min(75 + (indicatorCount * 7), 96);
      explanation = `Real URL detection engine identified ${indicatorCount} security indicator(s) including IP host usage, unencrypted protocol, or typosquatting patterns.`;
    } else {
      riskLevel = 'MEDIUM';
      riskScore = Math.min(45 + (indicatorCount * 10), 68);
      explanation = `Real URL detection engine identified ${indicatorCount} moderate security indicator(s). Caution is recommended.`;
    }
  }

  // Generate actionable recommendations
  const recommendations = [];
  if (detectionResult.evidenceList.some(e => e.code === 'IP_HOST')) {
    recommendations.push('Do NOT enter credentials or personal data on raw IP address links.');
  }
  if (detectionResult.evidenceList.some(e => e.code === 'HTTP_PROTOCOL')) {
    recommendations.push('Ensure the web portal uses secure HTTPS encryption before proceeding.');
  }
  if (detectionResult.evidenceList.some(e => e.code === 'SUSPICIOUS_DOMAIN_SEPARATOR' || e.code === 'PHISHING_URL_KEYWORD')) {
    recommendations.push('Verify that the web address matches official bank/service domains (e.g. sbi.co.in or .gov.in).');
  }
  if (recommendations.length === 0) {
    recommendations.push('This link appears safe based on domain structure checks.');
    recommendations.push('Always check that your browser displays a secure lock icon.');
  }

  return {
    inputType: 'url',
    url: trimmedUrl,
    detected: detectionResult.detected,
    indicatorCount: detectionResult.indicatorCount,
    evidenceList: detectionResult.evidenceList,
    indicators: indicatorsFormatted.length > 0 ? indicatorsFormatted : ['No threat indicators detected'],
    riskScore,
    riskLevel,
    result: riskLevel === 'HIGH' ? 'SUSPICIOUS_PHISHING_URL' : riskLevel === 'MEDIUM' ? 'MODERATE_RISK_URL' : 'VERIFIED_SAFE_URL',
    explanation,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeUrlService
};
