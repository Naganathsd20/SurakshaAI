/**
 * Health Check Controller
 * Returns the operational status of the SurakshaAI backend server.
 */
const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: "SurakshaAI backend is running"
  });
};

module.exports = {
  getHealthStatus
};
