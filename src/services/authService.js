import { API_MODE } from "../utils/api";
import { authApi } from "./authApi";

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
    currentUser = data.data?.user ?? data.user ?? data.data ?? data;
    return data;
  },

  async logout() {
    currentUser = null;
    clearSession();
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
      currentUser = data.data?.user ?? data.user ?? data.data ?? data;
      return currentUser;
    } catch {
      currentUser = null;
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
    };
  },

  isAuthenticated() {
    return Boolean(currentUser || (isMock() && readSession()?.user));
  },

  getUser() {
    return currentUser || (isMock() ? readSession()?.user : null);
  },

  getRole() {
    return this.getUser()?.role ?? null;
  },
};

