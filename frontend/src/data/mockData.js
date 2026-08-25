/**
 * SurakshaAI — Dataset & Mock Presets
 * Contains preset messages, preset URLs, mock scan outputs, and sample presets.
 */

export const PRESET_MESSAGES = [
  {
    id: 'msg-1',
    title: 'Hindi Bank Account KYC Scam',
    language: 'hi',
    languageLabel: 'Hindi (हिन्दी)',
    text: 'प्रिय ग्राहक, आपका SBI खाता आज रात बंद हो जाएगा। तुरंत अपना PAN अपडेट करने के लिए इस लिंक पर क्लिक करें: http://sbi-kyc-update-verify.com/login वरना खाता ब्लॉक कर दिया जाएगा।'
  },
  {
    id: 'msg-2',
    title: 'Kannada Power Cut Scam',
    language: 'kn',
    languageLabel: 'Kannada (ಕನ್ನಡ)',
    text: 'ಗಮನಿಸಿ! ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಸದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ನಿಮ್ಮ ಮನೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕವನ್ನು ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ. ತಕ್ಷಣ ಹಣ ಪಾವತಿಸಿ ಮತ್ತು ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಿ.'
  },
  {
    id: 'msg-3',
    title: 'English Urgent Banking OTP Scam',
    language: 'en',
    languageLabel: 'English',
    text: 'Your bank account will be blocked. Verify your OTP immediately.'
  },
  {
    id: 'msg-4',
    title: 'Hinglish Account Block Threat',
    language: 'hi',
    languageLabel: 'Hinglish (Hindi/English)',
    text: 'Dear customer aapka account block ho jayega. Urgently click link and share OTP.'
  },
  {
    id: 'msg-5',
    title: 'Legitimate Hindi Meeting Reminder',
    language: 'hi',
    languageLabel: 'Hindi (हिन्दी)',
    text: 'नमस्ते राम, कल दोपहर 2 बजे हमारी टीम मीटिंग है। कृपया समय पर आएं।'
  }
];

export const PRESET_URLS = [
  {
    id: 'url-1',
    title: 'Spoofed Banking Domain',
    url: 'http://sbi-kyc-update-verify.com/login',
    riskLevel: 'HIGH',
    riskScore: 94,
    indicators: [
      'Domain Typosquatting / Brand Spoofing (SBI)',
      'Missing SSL / Non-HTTPS Protocol (HTTP)',
      'Suspicious Keyword Combination (kyc-update-verify)',
      'Newly Registered Domain Pattern'
    ],
    explanation: 'The URL uses "sbi" in a newly registered non-official domain to trick users into believing it is the official State Bank of India portal. It lacks HTTPS encryption, making it unsafe.',
    recommendations: [
      'Do NOT enter your net banking credentials or password on this page.',
      'Always verify that banking websites end with official domains like .co.in or .com.',
      'Navigate to the bank website manually by typing the address yourself.'
    ]
  },
  {
    id: 'url-2',
    title: 'Suspicious IP Address Web Link',
    url: 'http://192.168.1.105:8080/secure-update/claim.php',
    riskLevel: 'HIGH',
    riskScore: 89,
    indicators: [
      'Raw IP Address Host Name (No Registered Domain)',
      'Non-Standard Web Port (:8080)',
      'Unencrypted Transmission',
      'Executable Script Target (.php)'
    ],
    explanation: 'Legitimate financial institutions and organizations never use raw IP addresses for public user portals. This is a classic indicator of a phisher hosting a temporary phishing kit.',
    recommendations: [
      'Close the browser tab immediately.',
      'Do not download files or input any information.'
    ]
  },
  {
    id: 'url-3',
    title: 'Official Government Portal (Legitimate)',
    url: 'https://cybercrime.gov.in',
    riskLevel: 'SAFE',
    riskScore: 2,
    indicators: [
      'Verified National Top-Level Domain (.gov.in)',
      'Valid SSL Security Certificate (HTTPS)',
      'Official Government Infrastructure'
    ],
    explanation: 'This link leads to the official National Cyber Crime Reporting Portal of the Government of India. It is completely legitimate and secure.',
    recommendations: [
      'This link is safe to visit.',
      'Use this portal to report genuine phishing incidents.'
    ]
  }
];

export const MOCK_HISTORY = [
  {
    id: 'hist-101',
    type: 'Message',
    title: 'Hindi Bank Account KYC Scam',
    target: 'प्रिय ग्राहक, आपका SBI खाता आज रात बंद हो जाएगा...',
    language: 'Hindi (हिन्दी)',
    timestamp: '2026-08-24 19:45:10'
  },
  {
    id: 'hist-102',
    type: 'URL',
    title: 'Spoofed Banking Link',
    target: 'http://sbi-kyc-update-verify.com/login',
    language: 'English',
    riskLevel: 'HIGH',
    riskScore: 94,
    timestamp: '2026-08-24 18:20:05'
  },
  {
    id: 'hist-103',
    type: 'Message',
    title: 'Kannada Power Cut Scam',
    target: 'ಗಮನಿಸಿ! ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಸದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ...',
    language: 'Kannada (ಕನ್ನಡ)',
    timestamp: '2026-08-24 16:15:30'
  }
];

export const MOCK_STATS = {
  totalScanned: 1248,
  highRiskCount: 542,
  mediumRiskCount: 310,
  safeCount: 396,
  languagesCovered: 7
};
