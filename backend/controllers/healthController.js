/**
 * Health Check Controller
 * Route: GET /api/health
 * Returns HTTP 200 status with operational health confirmation payload.
 */
const getHealthStatus = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "SurakshaAI backend is running"
  });
};

module.exports = {
  getHealthStatus
};
