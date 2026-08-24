const { analyzeMessageService } = require('../services/messageService');
const { analyzeUrlService } = require('../services/urlService');
const { assessRiskService } = require('../services/riskService');

/**
 * Controller for Message Analysis
 * Route: POST /api/analyze/message
 */
const analyzeMessage = async (req, res, next) => {
  try {
    const { text, language } = req.body;
    const result = await analyzeMessageService(text, language);

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
