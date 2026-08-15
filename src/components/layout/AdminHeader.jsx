import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, Languages, ExternalLink } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { useTranslation } from "../../utils/useTranslation";
import useLanguageStore from "../../store/useLanguageStore";

export default function AdminHeader({ onMenuClick }) {
  const { t, language } = useTranslation();
  const setLanguage = useLanguageStore((state) => state.setLanguage);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-[#E5E7E5] bg-[#FAF9F8]/90 px-4 backdrop-blur-[6px] sm:px-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={t("admin.layout.openMenu")}
          className="rounded-md p-2 text-[#001809] transition-colors hover:bg-surface-card lg:hidden"
        >
          <Menu size={20} />
        </button>
        <span className="hidden font-serif text-base font-bold tracking-tight text-[#001809] sm:block">
          {t("admin.brand")}
        </span>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          aria-label={t("admin.layout.language")}
          className="flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-[#424842] transition-colors hover:bg-surface-card hover:text-[#001809]"
        >
          <Languages size={16} aria-hidden="true" />
          <span className="hidden sm:inline">
            {language === "ar" ? "EN" : "ع"}
          </span>
        </button>

        <Link
          to="/"
          className="hidden h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold text-[#424842] transition-colors hover:bg-surface-card hover:text-[#001809] md:flex"
        >
          <ExternalLink size={15} aria-hidden="true" />
          {t("admin.backToSite")}
        </Link>

        <span className="mx-1 hidden h-5 w-px bg-[#D7DDD7] sm:block" />

        <div className="hidden items-center gap-2 rounded-lg px-2 py-1.5 sm:flex">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
            {(user?.name || "U").charAt(0)}
          </span>
          <span className="max-w-[120px] truncate text-sm font-semibold text-[#001809]">
            {user?.name || "Admin"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-[#424842] transition-colors outline-none hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:opacity-60"
        >
          {t("admin.signOut")}
        </button>
      </div>
    </header>
  );
}
