/**
 * SurakshaAI — Phase 2 Mock Dataset
 * Contains preset messages, preset URLs, mock scan outputs, and scan history logs.
 */

export const PRESET_MESSAGES = [
  {
    id: 'msg-1',
    title: 'Hindi Bank Account KYC Scam',
    language: 'hi',
    languageLabel: 'Hindi (हिन्दी)',
    text: 'प्रिय ग्राहक, आपका SBI खाता आज रात बंद हो जाएगा। तुरंत अपना PAN अपडेट करने के लिए इस लिंक पर क्लिक करें: http://sbi-kyc-update-verify.com/login वरना खाता ब्लॉक कर दिया जाएगा।',
    riskLevel: 'HIGH',
    riskScore: 92,
    indicators: [
      'Urgency & Account Suspension Threat',
      'Suspicious Non-Official Domain Link',
      'Banking Credential Harvesting Pattern',
      'Unverified PAN Verification Link'
    ],
    explanation: 'यह संदेश एक गंभीर बैंकिंग फ़िशिंग प्रयास है। इसमें खाते के बंद होने का डर दिखाकर उपयोगकर्ता से तत्काल कार्रवाई करने की मांग की गई है। दिए गए लिंक में SBI का नाम गलत तरीके से इस्तेमाल किया गया है जो कि एक अनधिकृत वेबसाइट है।',
    recommendations: [
      'इस लिंक पर भूलकर भी क्लिक न करें।',
      'अपनी बैंकिंग जानकारी, पासवर्ड या OTP किसी के साथ साझा न करें।',
      'आधिकारिक SBI वेबसाइट (sbi.co.in) या निकटतम शाखा से संपर्क करें।',
      'इस संदेश की रिपोर्ट 1930 (राष्ट्रीय साइबर अपराध हेल्पलाइन) पर करें।'
    ]
  },
  {
    id: 'msg-2',
    title: 'Kannada Electricity Power Cut Scam',
    language: 'kn',
    languageLabel: 'Kannada (ಕನ್ನಡ)',
    text: 'ಗಮನಿಸಿ! ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್ ಪಾವತಿಸದ ಕಾರಣ ಇಂದು ರಾತ್ರಿ 9:30 ಕ್ಕೆ ನಿಮ್ಮ ಮನೆ ವಿದ್ಯುತ್ ಸಂಪರ್ಕವನ್ನು ಕಡಿತಗೊಳಿಸಲಾಗುತ್ತದೆ. ತಕ್ಷಣ ಈ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ: 9876543210 ತಕ್ಷಣ ಪಾವತಿಸಿ.',
    riskLevel: 'HIGH',
    riskScore: 88,
    indicators: [
      'Immediate Service Disconnection Threat',
      'Urgency Impersonation (BESCOM/Electricity Board)',
      'Unverified Personal Phone Number for Payment',
      'Coercive Financial Fraud Pattern'
    ],
    explanation: 'ಈ ಸಂದೇಶವು ವಿದ್ಯುತ್ ಇಲಾಖೆಯ ಹೆಸರಿನಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ವಂಚನೆಯಾಗಿದೆ. ವಿದ್ಯುತ್ ಇಲಾಖೆಯು ಎಂದಿಗೂ ವೈಯಕ್ತಿಕ ಫೋನ್ ಸಂಖ್ಯೆಗಳಿಗೆ ತಕ್ಷಣ ಹಣ ಪಾವತಿಸಲು ಅಥವಾ ಸಂಪರ್ಕ ಕಡಿತಗೊಳಿಸುವುದಾಗಿ ಬೆದರಿಕೆ ಹಾಕುವುದಿಲ್ಲ.',
    recommendations: [
      'ಸಂದೇಶದಲ್ಲಿ ನೀಡಲಾದ ಫೋನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಬೇಡಿ.',
      'ಅಧಿಕೃತ BESCOM/ವಿದ್ಯುತ್ ಮಂಡಳಿ ಪೋರ್ಟಲ್ ಅಥವಾ ಅಧಿಕೃತ ಆ್ಯಪ್ ಮೂಲಕ ಮಾತ್ರ ಬಿಲ್ ಪರಿಶೀಲಿಸಿ.',
      'ಯಾವುದೇ ಅಪರಿಚಿತ ವ್ಯಕ್ತಿಗೆ UPI ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರಗಳನ್ನು ನೀಡಬೇಡಿ.'
    ]
  },
  {
    id: 'msg-3',
    title: 'English Urgent Banking OTP Scam',
    language: 'en',
    languageLabel: 'English',
    text: 'URGENT: Rs 49,999 debited from your HDFC account ending xx4819. If you did not authorize this transaction, click immediately to reverse: http://hdfc-fraud-alert-support.net/cancel',
    riskLevel: 'HIGH',
    riskScore: 95,
    indicators: [
      'Fake Transaction Panic Creation',
      'Unusual Domain Extension (.net)',
      'Urgent Call-to-Action for Fraud Reversal',
      'Credential / OTP Phishing Trap'
    ],
    explanation: 'This message uses panic tactics by claiming an unauthorized debit of Rs 49,999. The provided link leads to a phishing site disguised as a support page to steal mobile banking credentials or OTPs.',
    recommendations: [
      'Do NOT click on the link provided in the SMS.',
      'Check your official banking app or net banking portal directly.',
      'Call the official customer care number listed on the back of your debit/credit card.',
      'Block the sender and report to cyber crime portal (cybercrime.gov.in).'
    ]
  },
  {
    id: 'msg-4',
    title: 'Marathi Government Subsidy Scheme Claim',
    language: 'mr',
    languageLabel: 'Marathi (मराठी)',
    text: 'सरकारी योजना: सर्व नागरिकांना ₹5,000 दिवाळी बोनस मिळत आहे. तुमचा दावा करण्यासाठी येथे फॉर्म भरा: http://yojana-claim-free.org/apply',
    riskLevel: 'MEDIUM',
    riskScore: 68,
    indicators: [
      'Free Cash / Bonus Offer Bait',
      'Unofficial Government Subdomain',
      'Personal Detail Gathering Request'
    ],
    explanation: 'हा संदेश मोफत पैशांचे आमिष दाखवून नागरिकांची वैयक्तिक माहिती गोळा करण्याचा प्रयत्न करतो. अधिकृत सरकारी योजना नेहमी .gov.in वरच असतात.',
    recommendations: [
      'अनधिकृत लिंकवर फॉर्म भरू नका.',
      'सरकारी योजनांच्या अधिकृत संकेतस्थळांना (.gov.in) भेट द्या.'
    ]
  },
  {
    id: 'msg-5',
    title: 'Legitimate Hindi Greeting & Meeting Reminder',
    language: 'hi',
    languageLabel: 'Hindi (हिन्दी)',
    text: 'नमस्ते, कल सुबह 11:00 बजे हमारी टीम मीटिंग गूगल मीट पर निर्धारित है। कृपया समय पर जुड़ें। धन्यवाद!',
    riskLevel: 'SAFE',
    riskScore: 5,
    indicators: [
      'Normal Conversational Syntax',
      'No Financial or Credential Requests',
      'No Suspicious External Links'
    ],
    explanation: 'इस संदेश में कोई संदिग्ध या हानिकारक पैटर्न नहीं पाया गया। यह एक सामान्य कार्यReminders या बातचीत का संदेश है।',
    recommendations: [
      'यह संदेश सुरक्षित प्रतीत होता है।',
      'किसी कार्रवाई की आवश्यकता नहीं है।'
    ]
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
    riskLevel: 'HIGH',
    riskScore: 92,
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
    riskLevel: 'HIGH',
    riskScore: 88,
    timestamp: '2026-08-24 16:15:30'
  },
  {
    id: 'hist-104',
    type: 'Message',
    title: 'Marathi Scheme Claim',
    target: 'सरकारी योजना: सर्व नागरिकांना ₹5,000 दिवाळी बोनस...',
    language: 'Marathi (मराठी)',
    riskLevel: 'MEDIUM',
    riskScore: 68,
    timestamp: '2026-08-24 14:02:11'
  },
  {
    id: 'hist-105',
    type: 'URL',
    title: 'Official Portal Check',
    target: 'https://cybercrime.gov.in',
    language: 'English',
    riskLevel: 'SAFE',
    riskScore: 2,
    timestamp: '2026-08-24 11:30:00'
  },
  {
    id: 'hist-106',
    type: 'Message',
    title: 'Team Meeting Reminder',
    target: 'नमस्ते, कल सुबह 11:00 बजे हमारी टीम मीटिंग...',
    language: 'Hindi (हिन्दी)',
    riskLevel: 'SAFE',
    riskScore: 5,
    timestamp: '2026-08-23 20:12:45'
  }
];

export const MOCK_STATS = {
  totalScanned: 1248,
  highRiskCount: 542,
  mediumRiskCount: 310,
  safeCount: 396,
  languagesCovered: 7
};
