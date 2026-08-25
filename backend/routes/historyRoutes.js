const express = require('express');
const router = express.Router();
const { getHistoryList, getHistoryItemById } = require('../controllers/historyController');

// GET /api/history
router.get('/', getHistoryList);

// GET /api/history/:id
router.get('/:id', getHistoryItemById);

module.exports = router;
