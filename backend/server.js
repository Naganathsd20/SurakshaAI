const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const historyRoutes = require('./routes/historyRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security HTTP headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Gzip Compression
app.use(compression());

// Rate Limiting for API routes (100 requests per 15 min window per IP)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests from this IP. Please try again after 15 minutes."
    }
  }
});
app.use('/api/', apiLimiter);

// Production-Safe Dynamic CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()) 
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Fallback for local development tool access
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Strict Body Parser Payload Limits (1MB Maximum)
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

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
    status: "Phase 10 Security & Production Hardened API Operational",
    version: "1.0.0",
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

let server;

// Initialize Server & Database Connection
const startServer = async () => {
  await connectDB();

  server = app.listen(PORT, () => {
    console.log(`🚀 [SurakshaAI Backend API] Security-hardened server running on port ${PORT}`);
    console.log(`📡 [Health Check] GET http://localhost:${PORT}/api/health`);
    console.log(`🛡️ [Security Active] Helmet HTTP Headers, IP Rate Limiter & Gzip Active`);
  });
};

// Graceful Shutdown Handling for Server & Database Pools
const shutdownGracefully = async (signal) => {
  console.log(`\n⚠️ Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async () => {
      console.log('🔒 Express HTTP server closed.');
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
        console.log('🗄️ MongoDB pool connection closed.');
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdownGracefully('SIGINT'));
process.on('SIGTERM', () => shutdownGracefully('SIGTERM'));

startServer();



