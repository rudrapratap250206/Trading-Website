import axios from "axios";

// allow overriding the backend base URL via environment variable
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      `[API] Requesting: ${config.method.toUpperCase()} ${config.url}`,
    );
    return config;
  },
  (error) => {
    console.error("[API] Request Error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[API] Success: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    // Backend server not running
    if (!error.response) {
      const message = `Backend server is not running on ${API_URL}. Please start the backend server.`;
      console.error("[API] Network Error:", message);
      error.userMessage = message;
    }
    // Other HTTP errors
    else {
      error.userMessage =
        error.response.data?.message ||
        `Server error: ${error.response.status}`;
      console.error(
        "[API] HTTP Error:",
        error.response.status,
        error.userMessage,
      );
    }
    return Promise.reject(error);
  },
);

export default api;
