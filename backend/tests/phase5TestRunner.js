/**
 * SurakshaAI — Phase 5 Verification Test Suite
 * Validates Language Processing, NLP Intent Analysis, Phase 4 Integration,
 * Provider Provenance, and Phase 6 Boundary Enforcement (No riskScore / riskLevel).
 */

const { analyzeMessageService } = require('../services/messageService');

const runTests = async () => {
  console.log('============== SURAKSHAAI PHASE 5 TEST SUITE ==============\n');

  let passedCount = 0;
  let failedCount = 0;

  const assert = (condition, testName, details = '') => {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`❌ [FAIL] ${testName} - ${details}`);
      failedCount++;
    }
  };

  // TEST 1: English Phishing Message
  console.log('--- Test Case 1: English Phishing Message ---');
  const res1 = await analyzeMessageService('Your bank account will be blocked. Verify your OTP immediately.', 'en');
  assert(res1.language.code === 'en', 'English Language Detection', `Got ${res1.language.code}`);
  assert(res1.intentSignals.some(s => s.code === 'URGENCY'), 'NLP Intent: URGENCY Detected');
  assert(res1.intentSignals.some(s => s.code === 'FEAR_THREAT'), 'NLP Intent: FEAR_THREAT Detected');
  assert(res1.intentSignals.some(s => s.code === 'OTP_REQUEST'), 'NLP Intent: OTP_REQUEST Detected');
  assert(res1.nlpAnalysis.phishingIntent === true, 'NLP Phishing Intent Flag True');
  assert(res1.phase4Indicators.detected === true, 'Phase 4 Indicators Detected');
  assert(res1.riskScore === undefined && res1.riskLevel === undefined, 'Phase 6 Boundary: riskScore/riskLevel are UNDEFINED');

  // TEST 2: Hindi Phishing Message (Devanagari Script)
  console.log('\n--- Test Case 2: Hindi Regional Phishing Message ---');
  const res2 = await analyzeMessageService('आपका भारतीय स्टेट बैंक खाता आज निष्क्रय कर दिया जाएगा। तुरंत केवाईसी अपडेट करें और ओटीपी साझा करें।', 'hi');
  assert(res2.language.detectedLanguage === 'hi', 'Hindi Language Detection', `Got ${res2.language.detectedLanguage}`);
  assert(res2.language.scriptType === 'DEVANAGARI', 'Devanagari Script Type Identified');
  assert(res2.intentSignals.some(s => s.code === 'AUTHORITY_IMPERSONATION'), 'NLP Intent: BANK IMPERSONATION');
  assert(res2.intentSignals.some(s => s.code === 'CREDENTIAL_REQUEST'), 'NLP Intent: CREDENTIAL / KYC REQUEST');
  assert(res2.intentSignals.some(s => s.code === 'OTP_REQUEST'), 'NLP Intent: OTP REQUEST');
  assert(res2.phase4Indicators.indicatorCount > 0, 'Phase 4 Rule Indicators Present');

  // TEST 3: Kannada Phishing Message (Kannada Script)
  console.log('\n--- Test Case 3: Kannada Regional Phishing Message ---');
  const res3 = await analyzeMessageService('ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಇಂದು ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ. ತಕ್ಷಣ ಕೆವೈಸಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ ಒಟಿಪಿ ಹಂಚಿಕೊಳ್ಳಿ.', 'kn');
  assert(res3.language.detectedLanguage === 'kn', 'Kannada Language Detection', `Got ${res3.language.detectedLanguage}`);
  assert(res3.language.scriptType === 'KANNADA', 'Kannada Script Type Identified');
  assert(res3.intentSignals.some(s => s.code === 'FEAR_THREAT'), 'NLP Intent: FEAR THREAT');
  assert(res3.intentSignals.some(s => s.code === 'OTP_REQUEST'), 'NLP Intent: OTP REQUEST');

  // TEST 4: Safe Regional Message
  console.log('\n--- Test Case 4: Safe Regional Message ---');
  const res4 = await analyzeMessageService('नमस्ते राम, कल दोपहर 2 बजे हमारी टीम मीटिंग है। कृपया समय पर आएं।', 'hi');
  assert(res4.language.detectedLanguage === 'hi', 'Hindi Language Identification');
  assert(res4.nlpAnalysis.phishingIntent === false, 'NLP Phishing Intent False for Safe Message');
  assert(res4.intentSignals.length === 0, 'Zero Threat Signals for Safe Message');
  assert(res4.phase4Indicators.detected === false, 'Phase 4 Indicators False');

  // TEST 5: Mixed-Language (Hinglish) Message
  console.log('\n--- Test Case 5: Code-Mixed (Hinglish) Message ---');
  const res5 = await analyzeMessageService('Dear customer aapka account block ho jayega. Urgently click link and share OTP.', 'hi');
  assert(res5.language.scriptType === 'LATIN', 'Latin Script for Transliterated Message');
  assert(res5.intentSignals.some(s => s.code === 'FEAR_THREAT'), 'Hinglish Intent: FEAR THREAT ("account block ho jayega")');
  assert(res5.intentSignals.some(s => s.code === 'REQUEST_CLICK_LINK'), 'Hinglish Intent: CLICK LINK');
  assert(res5.intentSignals.some(s => s.code === 'OTP_REQUEST'), 'Hinglish Intent: OTP REQUEST');

  // TEST 6: Provider Provenance & Edge Fallback
  console.log('\n--- Test Case 6: NLP Provider Provenance & Edge Handling ---');
  const res6 = await analyzeMessageService('', 'hi');
  assert(res6.nlpAnalysis.provider === 'local-nlp-engine', 'Honest Provider Provenance (local-nlp-engine)');
  assert(res6.nlpAnalysis.isAiModelUsed === false, 'Honest AI Model Flag (false)');
  assert(res6.processedText === '', 'Safe Empty Input Handling');

  console.log('\n===========================================================');
  console.log(`TEST SUMMARY: ${passedCount} Passed | ${failedCount} Failed`);
  console.log('===========================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
};

runTests();
