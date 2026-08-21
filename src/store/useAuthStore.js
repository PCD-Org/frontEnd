import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: authService.getUser(),
  isAuthenticated: authService.isAuthenticated(),
  status: "idle",
  isInitialized: false,

  async login(credentials) {
    set({ status: "loading" });
    try {
      const session = await authService.login(credentials);
      const user =
        authService.getUser() ||
        session?.user ||
        session?.data?.user ||
        session?.data ||
        session;
      set({
        user,
        isAuthenticated: true,
        status: "authenticated",
        isInitialized: true,
      });
      return session;
    } catch (error) {
      set({ status: "unauthenticated", user: null, isAuthenticated: false, isInitialized: true });
      throw error;
    }
  },

  async logout() {
    await authService.logout();
    set({ user: null, isAuthenticated: false, status: "unauthenticated", isInitialized: true });
  },

  async checkAuth() {
    set({ status: "loading" });
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        set({ user, isAuthenticated: true, status: "authenticated", isInitialized: true });
      } else {
        set({ user: null, isAuthenticated: false, status: "unauthenticated", isInitialized: true });
      }
      return user;
    } catch {
      set({ user: null, isAuthenticated: false, status: "unauthenticated", isInitialized: true });
      return null;
    }
  },
}));

