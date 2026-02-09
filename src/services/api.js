import axios from "axios";
import { getToken } from "../utils/storage";

/**
 * Central Axios instance
 * Automatically attaches JWT token if available
 */
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
