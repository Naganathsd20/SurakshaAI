/**
 * SurakshaAI — Phase 5 NLP Intent Analyzer (Deterministic Local NLP Engine)
 * Semantic intent extraction across regional scripts and transliterated text.
 */

const INTENT_RULES = [
  {
    code: 'URGENCY',
    label: 'Urgent action requested',
    regex: /(?:urgent|urgently|immediately|today|right now|within \d+ hours|immediately action|action required|तुरंत|आज|तत्काल|तಕ್ಷಣ|ಇಂದೇ|ತಕ್ಷಣವೇ|urgently verify)/i,
    confidenceBase: 0.90,
    explanationText: 'Message induces high time-pressure panic to bypass critical user scrutiny.'
  },
  {
    code: 'FEAR_THREAT',
    label: 'Account disconnection or blockage threat',
    regex: /(?:account.{0,25}(?:blocked|suspended|deactivated|closed|terminated)|electricity.{0,25}(?:cut|disconnected)|सस्पेंड|निष्क्रय|बंद हो जाएगा|ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ|ಬ್ಲಾಕ್|ब्लॉक|block ho jayega)/i,
    confidenceBase: 0.92,
    explanationText: 'Uses threats of financial service suspension or account termination to compel obedience.'
  },
  {
    code: 'AUTHORITY_IMPERSONATION',
    label: 'Bank or government authority impersonation',
    regex: /(?:sbi|hdfc|icici|axis|kotak|pnb|canara|rbi|electricity board|bescom|msedcl|yojana|भारतीय स्टेट बैंक|स्टेट बैंक|बैंक|ಬ್ಯಾಂಕ್)/i,
    confidenceBase: 0.88,
    explanationText: 'Impersonates official banking institutions or utility suppliers to build false credibility.'
  },
  {
    code: 'CREDENTIAL_REQUEST',
    label: 'Identity or KYC document update solicitation',
    regex: /(?:kyc|pan card|aadhaar|update kyc|verify pan|update details|केवाईसी|अद्यतन|अपडेट|ಕೆವೈಸಿ|ಅಪ್‌ಡೇಟ್|update pan)/i,
    confidenceBase: 0.91,
    explanationText: 'Requests sensitive identity verification documents (KYC/PAN) outside secure banking portals.'
  },
  {
    code: 'OTP_REQUEST',
    label: 'Sensitive OTP credential requested',
    regex: /(?:otp|one time password|verification code|share otp|tell otp|ओटीपी|साझा|ಒಟಿಪಿ|ಹಂಚಿಕೊಳ್ಳಿ)/i,
    confidenceBase: 0.95,
    explanationText: 'Solicits high-security One-Time Passwords used to authorize fraudulent financial transactions.'
  },
  {
    code: 'PAYMENT_REQUEST',
    label: 'Unverified payment or fund transfer request',
    regex: /(?:transfer money|send money|pay fee|pay bill|upi payment|deposit|भुगतान|हस्तांतरण|ಹಣ ಪಾವತಿಸಿ|ಪಾವತಿ)/i,
    confidenceBase: 0.86,
    explanationText: 'Prompts direct monetary transfers or bill payments to unverified accounts.'
  },
  {
    code: 'REWARD_PRIZE_BAIT',
    label: 'Fake lottery reward or cashback bait',
    regex: /(?:congratulations|lucky winner|lottery|win|won|prize|free gift|cashback|bonus|इनाम|बोनस|ಬಹುಮಾನ|ಲಕ್ಕಿ विनर)/i,
    confidenceBase: 0.93,
    explanationText: 'Uses unrealistic financial gain or lottery promises to lure victims into revealing credentials.'
  },
  {
    code: 'ACCOUNT_VERIFICATION',
    label: 'Unsolicited account verification prompt',
    regex: /(?:verify account|verify identity|confirm details|re-verify|सत्यापित करें|ಖಾತೆ ಪರಿಶೀಲಿಸಿ)/i,
    confidenceBase: 0.87,
    explanationText: 'Prompts victim to perform mandatory account re-verification on an unauthorized interface.'
  },
  {
    code: 'SUSPICIOUS_CALL_TO_ACTION',
    label: 'High-pressure call to action',
    regex: /(?:do it now|act fast|last chance|don't wait|अभी करें|ತಕ್ಷಣ ಮಾಡಿ)/i,
    confidenceBase: 0.85,
    explanationText: 'Directs immediate user execution before the user has time to verify authenticity.'
  },
  {
    code: 'REQUEST_CLICK_LINK',
    label: 'Prompt to open external web link',
    regex: /(?:click (?:here|link|now)|visit|http:\/\/|https:\/\/|link:|यहाँ क्लिक करें|ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ)/i,
    confidenceBase: 0.89,
    explanationText: 'Directs the target to follow an external hyperlink pointing to a potential phishing page.'
  },
  {
    code: 'CONFIDENTIAL_INFO_REQUEST',
    label: 'Request for private authentication data',
    regex: /(?:password|pin|cvv|atm pin|upi pin|login credentials|पासवर्ड|पिन|ಪಿನ್)/i,
    confidenceBase: 0.94,
    explanationText: 'Demands secret passwords, PINs, or card security codes.'
  }
];

/**
 * Executes local deterministic NLP intent analysis
 */
const analyzeLocalIntents = (text = '') => {
  if (!text || typeof text !== 'string') {
    return {
      intentSignals: [],
      phishingIntent: false,
      intentSummary: 'No text provided for NLP analysis.',
      detectedIntents: [],
      explanation: 'No message content evaluated.',
      recommendations: ['Always exercise caution when receiving unsolicited messages.']
    };
  }

  const intentSignals = [];
  const detectedIntents = [];

  for (const rule of INTENT_RULES) {
    const match = text.match(rule.regex);
    if (match) {
      detectedIntents.push(rule.code);
      intentSignals.push({
        code: rule.code,
        label: rule.label,
        confidence: rule.confidenceBase,
        evidence: `Matched phrase: "${match[0]}"`
      });
    }
  }

  const phishingIntent = detectedIntents.length > 0;

  // Build summary statement
  let intentSummary = 'No malicious phishing intents detected in text structure.';
  if (phishingIntent) {
    const labels = intentSignals.map(s => s.label).join(', ');
    intentSummary = `Phishing intent detected: Message exhibits ${labels}.`;
  }

  // Generate contextual explanation
  let explanation = 'NLP Intent Analysis did not identify any manipulative phishing tactics in this message.';
  if (phishingIntent) {
    const highRiskIntents = intentSignals.filter(s => ['OTP_REQUEST', 'FEAR_THREAT', 'CREDENTIAL_REQUEST', 'URGENCY'].includes(s.code));
    if (highRiskIntents.length > 0) {
      explanation = `NLP Intent Analysis identified ${intentSignals.length} suspicious intent signal(s). The sender employs pressure tactics and requests sensitive credentials or actions under threat.`;
    } else {
      explanation = `NLP Intent Analysis identified ${intentSignals.length} potential phishing indicator signal(s). Caution is recommended.`;
    }
  }

  // Generate safety recommendations
  const recommendations = [];
  if (detectedIntents.includes('OTP_REQUEST') || detectedIntents.includes('CONFIDENTIAL_INFO_REQUEST')) {
    recommendations.push('NEVER share your OTP, PIN, or net banking password with anyone.');
  }
  if (detectedIntents.includes('REQUEST_CLICK_LINK')) {
    recommendations.push('Do NOT click any web links embedded in this message.');
  }
  if (detectedIntents.includes('AUTHORITY_IMPERSONATION') || detectedIntents.includes('FEAR_THREAT')) {
    recommendations.push('Verify account status directly through your official banking portal or customer care number.');
  }
  if (detectedIntents.includes('REWARD_PRIZE_BAIT')) {
    recommendations.push('Be skeptical of unsolicited lottery wins or prize offers demanding personal details.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Always verify unexpected messages from unverified senders through official channels.');
    recommendations.push('Report suspected financial cyber fraud to national portal 1930.');
  }

  return {
    intentSignals,
    phishingIntent,
    intentSummary,
    detectedIntents,
    explanation,
    recommendations
  };
};

module.exports = {
  analyzeLocalIntents,
  INTENT_RULES
};
