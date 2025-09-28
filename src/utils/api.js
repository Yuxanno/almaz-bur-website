// Utility file for API configuration
// For production on Netlify, use relative URLs
const isProduction = import.meta.env.PROD;
export const API_URL = isProduction ? "/.netlify/functions" : (import.meta.env.VITE_API_URL || "http://localhost:5000");

console.log("API URL configured as:", API_URL);
console.log("Production mode:", isProduction);

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  console.log(`Making API call to: ${url}`);

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
};
