import { useState } from "react";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, ArrowRight } from "lucide-react";
import { useAuth } from "../features/auth/useAuth";
import { useTranslation } from "../utils/useTranslation";
import { API_MODE } from "../utils/api";
import Field from "../components/ui/admin/Field";
import Button from "../components/ui/admin/Button";

export default function LoginPage() {
  const { t, dir } = useTranslation();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = t("admin.login.errorRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = t("admin.login.errorEmail");
    }
    if (!form.password) {
      next.password = t("admin.login.errorRequired");
    } else if (form.password.length < 6) {
      next.password = t("admin.login.errorPassword");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      const from = location.state?.from || "/admin";
      navigate(from, { replace: true });
    } catch {
      setSubmitError(t("admin.login.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#E5E7E5] bg-white p-6 shadow-[0_8px_30px_rgba(0,24,9,0.05)] sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-primary">
              <Leaf size={22} aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-tight text-[#001809]">
                {t("admin.brand")}
              </h1>
              <p className="text-xs text-[#6B7280]">{t("admin.tagline")}</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#001809]">
            {t("admin.login.title")}
          </h2>
          <p className="mt-1 text-sm text-[#6B7280]">
            {t("admin.login.subtitle")}
          </p>

          {API_MODE === "mock" && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
              {t("admin.login.demo")}
            </p>
          )}

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <Field
              id="login-email"
              label={t("admin.login.email")}
              type="email"
              autoComplete="email"
              dir="ltr"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              error={errors.email}
              placeholder="admin@example.com"
            />
            <Field
              id="login-password"
              label={t("admin.login.password")}
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              error={errors.password}
              showLabel={t("admin.login.showPassword")}
              hideLabel={t("admin.login.hidePassword")}
            />

            {submitError && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              loading={submitting}
              disabled={submitting}
              className="w-full"
            >
              {submitting ? t("admin.login.signingIn") : t("admin.login.submit")}
            </Button>
          </form>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#006c48] transition-colors hover:text-[#081c15]"
          >
            {t("admin.login.returnHome")}
            {dir === "rtl" ? (
              <ArrowRight size={15} className="rtl:-scale-x-100" aria-hidden="true" />
            ) : (
              <ArrowRight size={15} aria-hidden="true" />
            )}
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-[#8B918B]">
          PCED © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
