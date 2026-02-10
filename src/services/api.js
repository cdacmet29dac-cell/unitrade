import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("unitrade_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// helper for file view
export const fileUrl = (path) => {
  if (!path) return "";
  return import.meta.env.VITE_FILE_VIEW_URL + encodeURIComponent(path);
};
