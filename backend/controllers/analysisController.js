const { analyzeMessageService } = require('../services/messageService');
const { analyzeUrlService } = require('../services/urlService');
const { assessRiskService } = require('../services/riskService');
const { saveScanRecord } = require('../services/historyService');

/**
 * Controller for Message Analysis
 * Route: POST /api/analyze/message
 */
const analyzeMessage = async (req, res, next) => {
  try {
    const { text, language } = req.body;
    const result = await analyzeMessageService(text, language);

    // Asynchronous background persistence to MongoDB (non-blocking, fail-safe)
    const savedDoc = await saveScanRecord(result).catch(err => {
      console.warn('⚠️ [Background Save Warning]: Failed to save message analysis ->', err.message);
      return null;
    });

    if (savedDoc && savedDoc._id) {
      result.scanId = savedDoc._id.toString();
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for URL Analysis
 * Route: POST /api/analyze/url
 */
const analyzeUrl = async (req, res, next) => {
  try {
    const { url } = req.body;
    const result = await analyzeUrlService(url);

    // Asynchronous background persistence to MongoDB (non-blocking, fail-safe)
    const savedDoc = await saveScanRecord(result).catch(err => {
      console.warn('⚠️ [Background Save Warning]: Failed to save URL analysis ->', err.message);
      return null;
    });

    if (savedDoc && savedDoc._id) {
      result.scanId = savedDoc._id.toString();
    }

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for Risk Assessment Contract
 * Route: POST /api/analyze/risk
 */
const assessRisk = async (req, res, next) => {
  try {
    const { type, payload } = req.body;
    const result = await assessRiskService(type, payload);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeMessage,
  analyzeUrl,
  assessRisk
};
