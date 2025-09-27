// Test file to verify environment variables
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("Environment variables test:");
console.log("VITE_API_URL:", API_URL);
console.log("Is development:", import.meta.env.DEV);
console.log("Is production:", import.meta.env.PROD);

export { API_URL };
