import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";
import Spinner from "../../components/ui/admin/Spinner";
import { useTranslation } from "../../utils/useTranslation";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isInitialized, status, checkAuth } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isInitialized && status === "idle") {
      checkAuth();
    }
  }, [isInitialized, status, checkAuth]);

  if (!isInitialized || status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <Spinner label={t("common.loading")} size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
}
