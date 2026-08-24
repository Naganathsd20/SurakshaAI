const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const healthRoutes = require('./routes/healthRoutes');

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

// Root route handler
app.get('/', (req, res) => {
  res.status(200).json({
    project: "SurakshaAI",
    status: "Phase 1 Foundation Operational",
    healthCheck: "/api/health"
  });
});

// Initialize Server & Database Connection
const startServer = async () => {
  // Initialize Database Connection asynchronously
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 [SurakshaAI Backend] Running on http://localhost:${PORT}`);
    console.log(`📡 [Health Endpoint] Available at http://localhost:${PORT}/api/health`);
  });
};

startServer();
