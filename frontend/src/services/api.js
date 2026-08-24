import { API_BASE_URL } from '../utils/constants';

/**
 * Basic API Service for SurakshaAI Backend Communication
 */

/**
 * Checks backend API health status
 * GET /api/health
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API Health Check Failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const api = {
  checkHealth
};
