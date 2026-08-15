import { useState } from "react";
import { useTranslation } from "../utils/useTranslation";
import useLanguageStore from "../store/useLanguageStore";
import { useAuth } from "../features/auth/useAuth";
import { API_MODE } from "../utils/api";
import { ROLES } from "../features/auth/permissions";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Badge from "../components/ui/admin/Badge";
import Button from "../components/ui/admin/Button";
import { Check } from "lucide-react";

export default function SettingsPage() {
  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const { user, permissions, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const roleLabel =
    user?.role === ROLES.ADMIN
      ? t("admin.roles.admin")
      : user?.role === ROLES.EDITOR
      ? t("admin.roles.editor")
      : user?.role ?? t("admin.media.unknown");

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <AdminPageHeader
        title={t("admin.nav.settings")}
        subtitle={t("admin.settings.subtitle")}
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.settings.demoNote")}
        </p>
      )}

      <section className="rounded-xl border border-[#E5E7E5] bg-white">
        <div className="border-b border-[#EDF0ED] px-5 py-4">
          <h2 className="text-base font-bold text-[#001809]">
            {t("admin.settings.account")}
          </h2>
        </div>
        <dl className="px-5 py-4">
          <div className="flex items-center justify-between gap-4 py-2 text-sm">
            <dt className="text-[#6B7280]">{t("admin.settings.name")}</dt>
            <dd className="font-medium text-[#001809]">{user?.name}</dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 text-sm">
            <dt className="text-[#6B7280]">{t("admin.settings.email")}</dt>
            <dd className="font-medium text-[#001809]" dir="ltr">
              {user?.email}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4 py-2 text-sm">
            <dt className="text-[#6B7280]">{t("admin.settings.role")}</dt>
            <dd>
              <Badge tone="success">{roleLabel}</Badge>
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 rounded-xl border border-[#E5E7E5] bg-white">
        <div className="border-b border-[#EDF0ED] px-5 py-4">
          <h2 className="text-base font-bold text-[#001809]">
            {t("admin.settings.language")}
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 px-5 py-4">
          <Button
            variant={language === "ar" ? "primary" : "secondary"}
            size="sm"
            icon={language === "ar" ? Check : undefined}
            onClick={() => setLanguage("ar")}
          >
            {t("admin.settings.arabic")}
          </Button>
          <Button
            variant={language === "en" ? "primary" : "secondary"}
            size="sm"
            icon={language === "en" ? Check : undefined}
            onClick={() => setLanguage("en")}
          >
            {t("admin.settings.english")}
          </Button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[#E5E7E5] bg-white">
        <div className="border-b border-[#EDF0ED] px-5 py-4">
          <h2 className="text-base font-bold text-[#001809]">
            {t("admin.settings.permissions")}
          </h2>
          <p className="mt-0.5 text-xs text-[#6B7280]">
            {t("admin.settings.permissionsHint")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {permissions.map((permission) => (
            <Badge key={permission} tone="muted">
              {permission}
            </Badge>
          ))}
        </div>
      </section>

      <div className="mt-6 flex justify-end">
        <Button
          variant="danger"
          loading={loggingOut}
          disabled={loggingOut}
          onClick={handleLogout}
        >
          {t("admin.signOut")}
        </Button>
      </div>
    </div>
  );
}
