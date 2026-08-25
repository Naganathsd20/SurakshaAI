/**
 * SurakshaAI — Phase 4 Message Phishing Detection Engine
 * Deterministic, rule-based detector evaluating suspicious text messages.
 */

// Keyword & Pattern Rules Dictionary (Unicode & Transliteration Safe)
const THREAT_PATTERNS = [
  {
    code: 'URGENT_LANGUAGE',
    label: 'Urgent pressure language detected',
    severity: 'high',
    regex: /(?:urgent|urgently|immediately|today|right now|within \d+ hours|immediately action|action required|तुरंत|आज|तत्काल|तಕ್ಷಣ|ಇಂದೇ)/i,
    description: 'Message creates artificial time pressure to panic the user.'
  },
  {
    code: 'ACCOUNT_CLOSURE_THREAT',
    label: 'Account suspension or disconnection threat',
    severity: 'high',
    regex: /(?:account.{0,20}(?:blocked|suspended|deactivated|closed|terminated)|electricity.{0,20}(?:cut|disconnected)|सस्पेंड|निष्क्रय|बंद हो जाएगा|ಖಾತೆಯನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ|ಬ್ಲಾಕ್)/i,
    description: 'Threatens service loss or account block to force rapid action.'
  },
  {
    code: 'OTP_REQUEST',
    label: 'Sensitive OTP credential requested',
    regex: /(?:otp|one time password|verification code|share otp|tell otp|ओटीपी|साझा|ಒಟಿಪಿ|ಹಂಚಿಕೊಳ್ಳಿ)/i,
    severity: 'high',
    description: 'Attempts to solicit One-Time Passwords used for financial transactions.'
  },
  {
    code: 'PIN_PASSWORD_REQUEST',
    label: 'Sensitive PIN, Password, or CVV requested',
    regex: /(?:password|pin|cvv|atm pin|upi pin|login credentials|पासवर्ड|पिन|ಪಿನ್)/i,
    severity: 'high',
    description: 'Requests private authentication credentials or card security codes.'
  },
  {
    code: 'CREDENTIAL_HARVESTING',
    label: 'KYC or PAN update credential harvest',
    regex: /(?:kyc|pan card|aadhaar|update kyc|verify pan|update details|केवाईसी|अद्यतन|अपडेट|ಕೆವೈಸಿ|ಅಪ್‌ಡೇಟ್)/i,
    severity: 'high',
    description: 'Unsolicited request to re-verify sensitive identity documents.'
  },
  {
    code: 'PAYMENT_REQUEST',
    label: 'Unverified payment or money transfer request',
    regex: /(?:transfer money|send money|pay fee|pay bill|upi payment|deposit|भुगतान|हस्तांतरण|ಹಣ ಪಾವತಿಸಿ|ಪಾವತಿ)/i,
    severity: 'medium',
    description: 'Prompts immediate fund transfer or financial transaction.'
  },
  {
    code: 'FEE_REFUND_SCAM',
    label: 'Suspicious fee, refund, or tax payment prompt',
    regex: /(?:refund|processing fee|tax payment|claim refund|reverse transaction|वापसी)/i,
    severity: 'medium',
    description: 'Demands processing fees to release supposed funds or refunds.'
  },
  {
    code: 'LOTTERY_PRIZE_OFFER',
    label: 'Fake lottery, cashback, or prize offer bait',
    regex: /(?:congratulations|lucky winner|lottery|win|won|prize|free gift|cashback|bonus|इनाम|बोनस|ಬಹುಮಾನ)/i,
    severity: 'high',
    description: 'Promises unrealistic financial gains or unearned prize rewards.'
  },
  {
    code: 'BANK_IMPERSONATION',
    label: 'Bank or financial institution impersonation',
    regex: /(?:sbi|hdfc|icici|axis|kotak|pnb|canara|bank|rbi|banking|भारतीय स्टेट बैंक|स्टेट बैंक|बैंक|ಬ್ಯಾಂಕ್)/i,
    severity: 'medium',
    description: 'References major banking entities to build false authority.'
  },
  {
    code: 'UTILITY_SERVICE_IMPERSONATION',
    label: 'Utility or government provider impersonation',
    regex: /(?:bescom|msedcl|tangedco|electricity board|telecom|jio|airtel|vi|customs|yojana)/i,
    severity: 'medium',
    description: 'Claims to represent electricity boards, telecom operators, or public services.'
  },
  {
    code: 'SUSPICIOUS_LINK_PROMPT',
    label: 'Prompt to click external web link',
    regex: /(?:click (?:here|link|now)|visit|http:\/\/|https:\/\/|link:|यहाँ क्लिक करें|ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡಿ)/i,
    severity: 'medium',
    description: 'Urges user to follow an embedded or unverified web URL.'
  }
];

/**
 * Analyzes text input for phishing indicators
 * Returns structured evidence object
 */
const detectMessageIndicators = (text = '') => {
  if (!text || typeof text !== 'string') {
    return {
      type: 'message',
      detected: false,
      indicatorCount: 0,
      evidenceList: []
    };
  }

  const evidenceList = [];

  for (const rule of THREAT_PATTERNS) {
    const match = text.match(rule.regex);
    if (match) {
      evidenceList.push({
        code: rule.code,
        label: rule.label,
        severity: rule.severity,
        evidence: `Matched text: "${match[0]}"`,
        description: rule.description
      });
    }
  }

  return {
    type: 'message',
    detected: evidenceList.length > 0,
    indicatorCount: evidenceList.length,
    evidenceList
  };
};

module.exports = {
  detectMessageIndicators,
  THREAT_PATTERNS
};
