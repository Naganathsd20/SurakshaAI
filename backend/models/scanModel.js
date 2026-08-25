const mongoose = require('mongoose');

/**
 * SurakshaAI — Phase 7 Scan Record Mongoose Model
 * Preserves complete analysis results produced by Phases 4–6.
 */
const scanSchema = new mongoose.Schema({
  inputType: {
    type: String,
    enum: ['message', 'url'],
    required: true,
    index: true
  },
  originalText: { type: String },
  url: { type: String },
  processedText: { type: String },
  textLength: { type: Number },

  // Phase 5 Language Metadata
  language: {
    code: String,
    name: String,
    selectedLanguage: String,
    detectedLanguage: String,
    scriptType: String,
    confidence: Number,
    isFallback: Boolean
  },

  // Phase 5 NLP Intent Analysis
  intentSignals: [{
    code: String,
    label: String,
    confidence: Number,
    evidence: String
  }],
  nlpAnalysis: {
    phishingIntent: Boolean,
    intentSummary: String,
    detectedIntents: [String],
    provider: String,
    isAiModelUsed: Boolean
  },

  // Phase 4 Security Indicators
  phase4Indicators: {
    type: { type: String },
    detected: Boolean,
    indicatorCount: Number,
    evidenceList: [{
      code: String,
      label: String,
      severity: String,
      evidence: String,
      description: String
    }]
  },

  // Phase 6 Risk Scoring & Explainability
  riskScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    index: true
  },
  riskLevel: {
    type: String,
    enum: ['SAFE', 'MEDIUM', 'HIGH'],
    required: true,
    index: true
  },
  result: { type: String, required: true },
  weightedEvidence: [{
    code: String,
    concept: String,
    label: String,
    severity: String,
    weight: Number,
    sources: [String],
    evidence: String
  }],
  explanation: { type: String },
  recommendations: [{ type: String }],
  scoringBreakdown: {
    rawCumulativeScore: Number,
    saturatedScore: Number,
    totalEvidenceItems: Number
  },

  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for multi-field filtering & search performance
scanSchema.index({ inputType: 1, riskLevel: 1, timestamp: -1 });

module.exports = mongoose.model('Scan', scanSchema);
