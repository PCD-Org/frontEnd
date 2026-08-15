import { useAuthStore } from "../../store/useAuthStore";
import { getPermissionsForRole, hasPermission } from "./permissions";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const status = useAuthStore((state) => state.status);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const can = (permission) => hasPermission(user?.role, permission);

  return {
    user,
    isAuthenticated,
    status,
    login,
    logout,
    can,
    role: user?.role ?? null,
    permissions: getPermissionsForRole(user?.role),
  };
}
