import axios from "axios";

export const API_MODE = import.meta.env.VITE_API_MODE || "api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1",
  withCredentials: true,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
  headers: {
    "Accept": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standard error normalization while preserving original response
    return Promise.reject(error);
  }
);

export default api;
