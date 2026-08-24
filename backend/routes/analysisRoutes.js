const express = require('express');
const router = express.Router();
const { analyzeMessage, analyzeUrl, assessRisk } = require('../controllers/analysisController');
const { validateMessageInput, validateUrlInput, validateRiskInput } = require('../middleware/validateInput');

// POST /api/analyze/message
router.post('/message', validateMessageInput, analyzeMessage);

// POST /api/analyze/url
router.post('/url', validateUrlInput, analyzeUrl);

// POST /api/analyze/risk
router.post('/risk', validateRiskInput, assessRisk);

module.exports = router;
