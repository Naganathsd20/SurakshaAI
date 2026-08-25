const { getScanHistory, getScanById } = require('../services/historyService');

/**
 * Controller for Fetching Scan History List
 * Route: GET /api/history
 */
const getHistoryList = async (req, res, next) => {
  try {
    const { riskLevel, type, search, page, limit } = req.query;

    const result = await getScanHistory({
      riskLevel,
      type,
      search,
      page,
      limit
    });

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller for Fetching Single Scan Record by ID
 * Route: GET /api/history/:id
 */
const getHistoryItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const record = await getScanById(id);

    return res.status(200).json({
      success: true,
      data: record
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHistoryList,
  getHistoryItemById
};
