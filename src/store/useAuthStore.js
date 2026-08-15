import { create } from "zustand";
import { authService } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: authService.getUser(),
  isAuthenticated: authService.isAuthenticated(),
  status: authService.isAuthenticated() ? "authenticated" : "unauthenticated",

  async login(credentials) {
    set({ status: "loading" });
    try {
      const session = await authService.login(credentials);
      set({
        user: session.user,
        isAuthenticated: true,
        status: "authenticated",
      });
      return session;
    } catch (error) {
      set({ status: "unauthenticated", user: null, isAuthenticated: false });
      throw error;
    }
  },

  async logout() {
    await authService.logout();
    set({ user: null, isAuthenticated: false, status: "unauthenticated" });
  },
}));
