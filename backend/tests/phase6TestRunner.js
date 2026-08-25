/**
 * SurakshaAI — Phase 6 Risk Scoring & Explainability Test Suite
 * Validates weighted scoring, deduplication, risk thresholds (SAFE/MEDIUM/HIGH),
 * explainability output, URL scoring integration, regression tests (A-F), and Phase 7 boundary assertions.
 */

const { analyzeMessageService } = require('../services/messageService');
const { analyzeUrlService } = require('../services/urlService');
const { assessRiskService } = require('../services/riskService');

const runTests = async () => {
  console.log('============== SURAKSHAAI PHASE 6 REGRESSION TEST SUITE ==============\n');

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

  // TEST A: Safe English Message
  console.log('--- Test A: Safe English Message ---');
  const resA = await analyzeMessageService('Your appointment is confirmed for tomorrow at 10 AM.', 'en');
  assert(resA.riskScore < 30, 'Safe Message Risk Score < 30', `Got score: ${resA.riskScore}`);
  assert(resA.riskLevel === 'SAFE', 'Risk Level is SAFE', `Got level: ${resA.riskLevel}`);
  assert(resA.weightedEvidence.length === 0, 'Zero weighted evidence for safe message');

  // TEST B: High-Risk English Message (Regression Guard against 0 / SAFE)
  console.log('\n--- Test B: High-Risk English Message ---');
  const resB = await analyzeMessageService('URGENT! Your bank account will be blocked today. Verify your OTP immediately by clicking this link.', 'en');
  assert(resB.riskScore !== 0 && resB.riskLevel !== 'SAFE', 'Regression Assertion: High-risk message must NEVER return score 0 or SAFE', `Got score: ${resB.riskScore}, level: ${resB.riskLevel}`);
  assert(resB.riskScore >= 70, 'High-Risk Message Score >= 70', `Got score: ${resB.riskScore}`);
  assert(resB.riskLevel === 'HIGH', 'Risk Level is HIGH', `Got level: ${resB.riskLevel}`);
  assert(resB.weightedEvidence.length > 0, 'Weighted evidence is populated');
  
  const hasPhase4Tag = resB.weightedEvidence.some(e => e.sources.includes('Phase 4 Rule'));
  const hasPhase5Tag = resB.weightedEvidence.some(e => e.sources.includes('Phase 5 NLP Intent'));
  assert(hasPhase4Tag, 'Weighted evidence contains Phase 4 Rule source tag');
  assert(hasPhase5Tag, 'Weighted evidence contains Phase 5 NLP Intent source tag');

  // TEST C: Hindi Phishing Message
  console.log('\n--- Test C: Hindi Regional Phishing Message ---');
  const resC = await analyzeMessageService('आपका बैंक खाता आज बंद हो जाएगा। तुरंत अपना OTP साझा करें।', 'hi');
  assert(resC.riskScore >= 70, 'Hindi Phishing Risk Score >= 70', `Got score: ${resC.riskScore}`);
  assert(resC.riskLevel === 'HIGH', 'Hindi Phishing Risk Level is HIGH', `Got level: ${resC.riskLevel}`);

  // TEST D: Kannada Phishing Message
  console.log('\n--- Test D: Kannada Regional Phishing Message ---');
  const resD = await analyzeMessageService('ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯನ್ನು ಇಂದು ಬಂದ್ ಮಾಡಲಾಗುತ್ತದೆ. ತಕ್ಷಣ OTP ಹಂಚಿಕೊಳ್ಳಿ.', 'kn');
  assert(resD.riskScore >= 70, 'Kannada Phishing Risk Score >= 70', `Got score: ${resD.riskScore}`);
  assert(resD.riskLevel === 'HIGH', 'Kannada Phishing Risk Level is HIGH', `Got level: ${resD.riskLevel}`);

  // TEST E: Phishing URL (IP Address Host)
  console.log('\n--- Test E: Phishing IP Address URL ---');
  const resE = await analyzeUrlService('http://192.168.1.10/login?verify=account');
  assert(resE.riskScore >= 80, 'Phishing IP URL Score >= 80', `Got score: ${resE.riskScore}`);
  assert(resE.riskLevel === 'HIGH', 'Phishing IP URL Risk Level is HIGH', `Got level: ${resE.riskLevel}`);

  // TEST F: Safe URL
  console.log('\n--- Test F: Safe Web URL ---');
  const resF = await analyzeUrlService('https://www.example.com');
  assert(resF.riskScore < 30, 'Safe URL Risk Score < 30', `Got score: ${resF.riskScore}`);
  assert(resF.riskLevel === 'SAFE', 'Safe URL Risk Level is SAFE', `Got level: ${resF.riskLevel}`);

  // TEST G: Standalone Risk API Service Contract
  console.log('\n--- Test G: Standalone Risk Service Contract ---');
  const resG = await assessRiskService('message', { text: 'Your account will be blocked today.' });
  assert(resG.contractVersion === '2.0-PHASE6', 'Phase 6 Contract Version');
  assert(typeof resG.overallRiskScore === 'number', 'Risk score is numeric');
  assert(['SAFE', 'MEDIUM', 'HIGH'].includes(resG.overallRiskLevel), 'Risk level valid classification');

  // TEST H: Phase 7 Boundary Assertion
  console.log('\n--- Test H: Phase 7 Boundary Assertion ---');
  const mongoose = require('mongoose');
  assert(mongoose.connection.readyState === 0, 'No active MongoDB connection invoked during Phase 6 analysis');

  console.log('\n===========================================================');
  console.log(`TEST SUMMARY: ${passedCount} Passed | ${failedCount} Failed`);
  console.log('===========================================================');

  if (failedCount > 0) {
    process.exit(1);
  }
};

runTests();
