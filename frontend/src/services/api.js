import { API_BASE_URL } from '../utils/constants';

/**
 * SurakshaAI Frontend API Service Client
 * Communicates with http://localhost:5000/api endpoints
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

/**
 * Submits message text for regional phishing analysis
 * POST /api/analyze/message
 */
export const analyzeMessage = async ({ text, language = 'hi' }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, language })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || `API Error (${response.status})`);
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Message Analysis API Error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Submits web link URL for heuristic analysis
 * POST /api/analyze/url
 */
export const analyzeUrl = async ({ url }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || `API Error (${response.status})`);
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("URL Analysis API Error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Submits payload for risk assessment scoring contract
 * POST /api/analyze/risk
 */
export const assessRisk = async ({ type, payload }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze/risk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type, payload })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || `API Error (${response.status})`);
    }

    return { success: true, data: data.data };
  } catch (error) {
    console.error("Risk API Error:", error.message);
    return { success: false, error: error.message };
  }
};

export const api = {
  checkHealth,
  analyzeMessage,
  analyzeUrl,
  assessRisk
};
