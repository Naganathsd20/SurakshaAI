const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const healthRoutes = require('./routes/healthRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', healthRoutes);

// Root route placeholder
app.get('/', (req, res) => {
  res.json({
    project: 'SurakshaAI',
    description: 'AI-Powered Regional-Language Phishing Detection Backend',
    status: 'Operational',
    version: '1.0.0',
    phase: 'Phase 1 - Project Foundation'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[SurakshaAI Backend] Server running on http://localhost:${PORT}`);
  console.log(`[SurakshaAI Backend] Health check endpoint: http://localhost:${PORT}/api/health`);
});
