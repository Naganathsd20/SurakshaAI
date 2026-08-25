const mongoose = require('mongoose');
const Scan = require('../models/scanModel');

/**
 * SurakshaAI — Phase 7 History Service
 * Database persistence and query layer for scan history records.
 */

/**
 * Persists completed analysis output to MongoDB
 * Fail-safe wrapper: Log errors silently if DB is offline without breaking API execution.
 */
const saveScanRecord = async (analysisData = {}) => {
  if (!analysisData || typeof analysisData !== 'object') return null;

  // Check if MongoDB connection is active
  if (mongoose.connection.readyState === 0) {
    return null;
  }

  try {
    const scan = new Scan({
      inputType: analysisData.inputType || (analysisData.url ? 'url' : 'message'),
      originalText: analysisData.originalText || analysisData.text || '',
      url: analysisData.url || '',
      processedText: analysisData.processedText || '',
      textLength: analysisData.textLength || 0,
      language: analysisData.language || {},
      intentSignals: analysisData.intentSignals || [],
      nlpAnalysis: analysisData.nlpAnalysis || {},
      phase4Indicators: analysisData.phase4Indicators || {},
      riskScore: analysisData.riskScore ?? 0,
      riskLevel: analysisLevelNormalize(analysisData.riskLevel),
      result: analysisData.result || 'UNKNOWN',
      weightedEvidence: analysisData.weightedEvidence || [],
      explanation: analysisData.explanation || '',
      recommendations: analysisData.recommendations || [],
      scoringBreakdown: analysisData.scoringBreakdown || {},
      timestamp: analysisData.timestamp || new Date()
    });

    const savedDoc = await scan.save();
    return savedDoc;
  } catch (error) {
    console.warn('⚠️ [History Service Warning]: Failed to persist scan record to MongoDB ->', error.message);
    return null;
  }
};

const analysisLevelNormalize = (level) => {
  const norm = String(level || 'SAFE').toUpperCase();
  if (['SAFE', 'MEDIUM', 'HIGH'].includes(norm)) return norm;
  return 'SAFE';
};

/**
 * Retrieves scan records from MongoDB with filtering, search, and pagination
 */
const getScanHistory = async ({ riskLevel = 'ALL', type = 'ALL', search = '', page = 1, limit = 50 }) => {
  if (mongoose.connection.readyState === 0) {
    return { records: [], totalRecords: 0, page: 1, limit, totalPages: 0, isDbConnected: false };
  }

  const filter = {};

  // Risk Level Filter
  if (riskLevel && riskLevel !== 'ALL') {
    filter.riskLevel = String(riskLevel).toUpperCase();
  }

  // Input Type Filter
  if (type && type !== 'ALL') {
    filter.inputType = String(type).toLowerCase();
  }

  // Keyword Search Filter
  if (search && search.trim() !== '') {
    const searchRegex = new RegExp(search.trim(), 'i');
    filter.$or = [
      { originalText: searchRegex },
      { url: searchRegex },
      { explanation: searchRegex },
      { 'language.name': searchRegex }
    ];
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 50));
  const skip = (pageNum - 1) * limitNum;

  const [records, totalRecords] = await Promise.all([
    Scan.find(filter).sort({ timestamp: -1 }).skip(skip).limit(limitNum).lean(),
    Scan.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(totalRecords / limitNum);

  return {
    records,
    totalRecords,
    page: pageNum,
    limit: limitNum,
    totalPages,
    isDbConnected: true
  };
};

/**
 * Retrieves a single scan record by ID
 */
const getScanById = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error('Invalid scan record ID format.');
    error.statusCode = 400;
    throw error;
  }

  if (mongoose.connection.readyState === 0) {
    const error = new Error('Database connection unavailable.');
    error.statusCode = 503;
    throw error;
  }

  const record = await Scan.findById(id).lean();
  if (!record) {
    const error = new Error('Scan record not found.');
    error.statusCode = 404;
    throw error;
  }

  return record;
};

module.exports = {
  saveScanRecord,
  getScanHistory,
  getScanById
};
