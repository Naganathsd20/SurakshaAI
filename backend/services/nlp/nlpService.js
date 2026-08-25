/**
 * SurakshaAI — Phase 5 NLP Service Orchestrator
 * Isolates external AI (Gemini) provider with transparent deterministic local NLP fallback.
 */

const { analyzeLocalIntents } = require('./intentAnalyzer');

/**
 * Main NLP analysis service entry point
 * @param {string} text Normalized message text
 * @param {object} languageMeta Language metadata object from languageProcessor
 */
const analyzeNlp = async (text = '', languageMeta = {}) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NLP_API_KEY;

  // If Gemini / External AI key is available, attempt AI model analysis
  if (apiKey && apiKey.trim() !== '') {
    try {
      // Stub for external AI API call (e.g. Gemini 1.5 Flash via REST / SDK)
      // If external call succeeds, return model findings with provider: 'gemini', isAiModelUsed: true
      // For resilience, if external call throws or returns invalid format, fall through to deterministic engine
    } catch (err) {
      console.warn('⚠️ [SurakshaAI NLP] External AI Provider call failed. Utilizing local deterministic NLP engine.', err.message);
    }
  }

  // Deterministic Local NLP Engine Fallback
  // Transparently identified as local engine (NEVER falsely claimed as AI)
  const localResults = analyzeLocalIntents(text);

  return {
    intentSignals: localResults.intentSignals,
    nlpAnalysis: {
      phishingIntent: localResults.phishingIntent,
      intentSummary: localResults.intentSummary,
      detectedIntents: localResults.detectedIntents,
      provider: 'local-nlp-engine',
      isAiModelUsed: false
    },
    explanation: localResults.explanation,
    recommendations: localResults.recommendations
  };
};

module.exports = {
  analyzeNlp
};
