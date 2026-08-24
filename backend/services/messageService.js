/**
 * Message Analysis Service Interface (Phase 3 Foundation)
 * Accepts raw text & language code, returning a structured foundation response contract.
 * Note: Real NLP & rule heuristic engines will extend this interface in Phase 4 & Phase 5.
 */

const analyzeMessageService = async (text, language = 'hi') => {
  const trimmed = text.trim();
  const length = trimmed.length;

  // Simple heuristic checks for basic contract demonstration
  const containsKyc = /kyc|sbi|bank|account|block|pan/i.test(trimmed);
  const containsUrgent = /urgent|immediately|आज रात|तुरंत|गंभीर/i.test(trimmed);

  let riskLevel = 'SAFE';
  let riskScore = 15;
  let indicators = ['Standard Conversational Text'];
  let explanation = 'Message contains normal text structure without high-urgency financial patterns.';
  let recommendations = [
    'No critical threat detected in current baseline check.',
    'Always verify unknown senders before sharing personal information.'
  ];

  if (containsKyc && containsUrgent) {
    riskLevel = 'HIGH';
    riskScore = 92;
    indicators = [
      'Urgency & Account Suspension Keyword Pattern',
      'Financial / KYC Credential Harvesting Indicator',
      'Unverified Regional Notification Format'
    ];
    explanation = 'The message combines urgent account blockage threats with requests for sensitive verification (KYC/PAN). This pattern strongly resembles regional SMS banking scams.';
    recommendations = [
      'Do NOT click any links provided in this message.',
      'Never share your net banking credentials, OTP, or PIN.',
      'Verify directly with your bank customer care or nearest branch.'
    ];
  } else if (containsKyc || containsUrgent) {
    riskLevel = 'MEDIUM';
    riskScore = 65;
    indicators = [
      'Potential Financial / Service Keyword Detected',
      'Moderate Urgency Tone'
    ];
    explanation = 'The message contains terms associated with banking or services. Caution is advised when responding to unsolicited messages.';
    recommendations = [
      'Exercise caution before clicking any links or calling numbers listed in the message.',
      'Check official service portals directly.'
    ];
  }

  return {
    inputType: 'message',
    processedText: trimmed.substring(0, 100) + (length > 100 ? '...' : ''),
    textLength: length,
    language: language || 'auto',
    riskScore,
    riskLevel,
    result: riskLevel === 'HIGH' ? 'SUSPICIOUS_PHISHING' : riskLevel === 'MEDIUM' ? 'MODERATE_CAUTION' : 'LIKELY_SAFE',
    indicators,
    explanation,
    recommendations,
    timestamp: new Date().toISOString()
  };
};

module.exports = {
  analyzeMessageService
};
