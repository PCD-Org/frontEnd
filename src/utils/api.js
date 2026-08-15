import axios from "axios";
import { tokenStore } from "./tokenStore";

export const API_MODE = import.meta.env.VITE_API_MODE || "mock";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 15000,
});

api.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (
      error.response?.status === 401 &&
      !original._retry &&
      tokenStore.getRefreshToken()
    ) {
      original._retry = true;
      try {
        const { authApi } = await import("../services/authApi");
        refreshing =
          refreshing || authApi.refresh(tokenStore.getRefreshToken());
        const { data } = await refreshing;
        refreshing = null;
        tokenStore.setTokens({
          access: data.accessToken,
          refresh: data.refreshToken || tokenStore.getRefreshToken(),
        });
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (refreshError) {
        refreshing = null;
        tokenStore.clear();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
