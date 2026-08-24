/**
 * Input Validation Middleware for SurakshaAI API Endpoints
 */

/**
 * Validates Message Analysis Request (POST /api/analyze/message)
 */
const validateMessageInput = (req, res, next) => {
  const { text } = req.body;

  if (text === undefined || text === null) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Message "text" field is required.'
    });
  }

  if (typeof text !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Message "text" must be a string.'
    });
  }

  if (text.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Message "text" cannot be empty or whitespace-only.'
    });
  }

  if (text.length > 5000) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Message text exceeds maximum limit of 5,000 characters.'
    });
  }

  next();
};

/**
 * Validates URL Analysis Request (POST /api/analyze/url)
 */
const validateUrlInput = (req, res, next) => {
  const { url } = req.body;

  if (url === undefined || url === null) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "url" field is required.'
    });
  }

  if (typeof url !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "url" must be a string.'
    });
  }

  const trimmedUrl = url.trim();

  if (trimmedUrl.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "url" cannot be empty.'
    });
  }

  // Basic URL structure validation
  try {
    // Add protocol if missing for construction check
    const checkUrl = trimmedUrl.match(/^https?:\/\//i) ? trimmedUrl : `http://${trimmedUrl}`;
    new URL(checkUrl);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Provided URL string is not a valid web URL format.'
    });
  }

  next();
};

/**
 * Validates Risk Assessment Request (POST /api/analyze/risk)
 */
const validateRiskInput = (req, res, next) => {
  const { type } = req.body;

  if (!type || typeof type !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Risk assessment requires a valid "type" string ("message" or "url").'
    });
  }

  const normalizedType = type.toLowerCase();
  if (normalizedType !== 'message' && normalizedType !== 'url') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "type" must be either "message" or "url".'
    });
  }

  next();
};

module.exports = {
  validateMessageInput,
  validateUrlInput,
  validateRiskInput
};
