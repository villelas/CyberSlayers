// API Configuration
// This file manages the backend API URL based on environment

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://cyberslayers-backend-252197785525.us-central1.run.app';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  PULL_GAME_DATA: `${API_BASE_URL}/api/auth/pull_game_data`,
  HEALTH: `${API_BASE_URL}/api/health`,
};

export default API_BASE_URL;