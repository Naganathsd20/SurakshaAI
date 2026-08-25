const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const historyRoutes = require('./routes/historyRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow local development origin
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Health Route (/api/health)
app.use('/api', healthRoutes);

// Mount Analysis Routes (/api/analyze/message, /api/analyze/url, /api/analyze/risk)
app.use('/api/analyze', analysisRoutes);

// Mount Scan History Routes (/api/history, /api/history/:id)
app.use('/api/history', historyRoutes);

// Root route handler
app.get('/', (req, res) => {
  res.status(200).json({
    project: "SurakshaAI",
    status: "Phase 7 REST API Operational with Database Persistence",
    endpoints: {
      health: "/api/health",
      analyzeMessage: "POST /api/analyze/message",
      analyzeUrl: "POST /api/analyze/url",
      assessRisk: "POST /api/analyze/risk",
      history: "GET /api/history",
      historyItem: "GET /api/history/:id"
    }
  });
});

// Unknown API Route Handler (404)
app.use(notFoundHandler);

// Global Error Handler Middleware
app.use(errorHandler);

// Initialize Server & Database Connection
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 [SurakshaAI Backend API] Running on http://localhost:${PORT}`);
    console.log(`📡 [Health Check] Available at http://localhost:${PORT}/api/health`);
    console.log(`📡 [Message API] Available at POST http://localhost:${PORT}/api/analyze/message`);
    console.log(`📡 [URL API] Available at POST http://localhost:${PORT}/api/analyze/url`);
    console.log(`📡 [Risk API] Available at POST http://localhost:${PORT}/api/analyze/risk`);
    console.log(`📡 [History API] Available at GET http://localhost:${PORT}/api/history`);
  });
};

startServer();
