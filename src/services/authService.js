import { API_MODE } from "../utils/api";
import { authApi } from "./authApi";
import { tokenStore } from "../utils/tokenStore";

const SESSION_KEY = "pced.admin.session";

let currentUser = null;

const isMock = () => API_MODE === "mock";

const readSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeSession = (session) =>
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

const createMockSession = (email) => ({
  user: {
    id: "demo-admin",
    name: "Admin",
    email,
    role: "admin",
  },
  accessToken: "mock-access-token",
  refreshToken: "mock-refresh-token",
  issuedAt: new Date().toISOString(),
});

export const authService = {
  async login({ email, password }) {
    if (isMock()) {
      const session = createMockSession(email);
      currentUser = session.user;
      writeSession(session);
      return session;
    }
    const { data } = await authApi.login({ email, password });
    currentUser = data.user ?? null;
    tokenStore.setTokens({
      access: data.accessToken,
      refresh: data.refreshToken,
    });
    return data;
  },

  async logout() {
    currentUser = null;
    clearSession();
    tokenStore.clear();
    if (!isMock()) {
      try {
        await authApi.logout();
      } catch {
        /* ignore network errors on logout */
      }
    }
  },

  async getCurrentUser() {
    if (isMock()) {
      return readSession()?.user ?? null;
    }
    if (currentUser) return currentUser;
    try {
      const { data } = await authApi.me();
      currentUser = data.user ?? data;
      return currentUser;
    } catch {
      tokenStore.clear();
      return null;
    }
  },

  getSession() {
    if (isMock()) {
      return readSession();
    }
    if (!currentUser) return null;
    return {
      user: currentUser,
      accessToken: tokenStore.getAccessToken(),
    };
  },

  isAuthenticated() {
    return Boolean(this.getSession()?.user);
  },

  getUser() {
    return this.getSession()?.user ?? null;
  },

  getRole() {
    return this.getUser()?.role ?? null;
  },

  async refresh() {
    if (isMock()) return null;
    const { data } = await authApi.refresh(tokenStore.getRefreshToken());
    tokenStore.setTokens({
      access: data.accessToken,
      refresh: data.refreshToken || tokenStore.getRefreshToken(),
    });
    return data;
  },
};
