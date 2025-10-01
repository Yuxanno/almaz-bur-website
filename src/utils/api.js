// Utility file for API configuration
const isProduction = import.meta.env.PROD;
const isDevelopment = !isProduction;

// API base URL configuration
// In production: relative path to Netlify functions
// In development: full path to Netlify dev server
export const API_BASE_URL = isProduction
  ? "" // Relative paths in production
  : "http://localhost:8888"; // Netlify dev server

console.log("API Base URL configured as:", API_BASE_URL);
console.log("Production mode:", isProduction);

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  // Ensure endpoint starts with a slash
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  // Construct full URL
  const url = `${API_BASE_URL}${normalizedEndpoint}`;
  console.log(`Making API call to: ${url}`);

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
};
