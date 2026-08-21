import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  Mail,
  Images,
  Newspaper,
  BookOpen,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../features/auth/useAuth";
import { useTranslation } from "../../utils/useTranslation";

const navItems = [
  { to: "/admin", key: "admin.nav.dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/activities", key: "admin.nav.activities", icon: CalendarDays, permission: "activities.read" },
  { to: "/admin/impact-statistics", key: "admin.nav.impactStats", icon: BarChart3 },
  { to: "/admin/contact-inquiries", key: "admin.nav.inquiries", icon: Mail },
  { to: "/admin/media", key: "admin.nav.media", icon: Images, permission: "media.read" },
  { to: "/admin/news", key: "admin.nav.news", icon: Newspaper, permission: "news.read" },
  { to: "/admin/research", key: "admin.nav.research", icon: BookOpen, permission: "research.read" },
  { to: "/admin/settings", key: "admin.nav.settings", icon: Settings },
];

export default function AdminSidebar({ variant = "desktop", open = false, onClose }) {
  const { t } = useTranslation();
  const { can, user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const isMobile = variant === "mobile";
  const items = navItems.filter((item) => !item.permission || can(item.permission));

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  const base =
    "flex flex-col border-e border-[#E5E7E5] bg-white";

  const placement = isMobile
    ? `fixed inset-y-0 z-40 w-64 transform transition-transform duration-300 ease-out lg:hidden ${
        open
          ? "translate-x-0 rtl:translate-x-0"
          : "ltr:-translate-x-full rtl:translate-x-full"
      } ltr:left-0 rtl:right-0`
    : "fixed inset-y-0 ltr:left-0 rtl:right-0 hidden w-64 lg:flex";

  return (
    <aside className={`${base} ${placement}`} aria-label={t("admin.layout.navigation")}>
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#EDF0ED] px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
            <span className="font-serif text-sm font-bold">P</span>
          </span>
          <span className="font-serif text-lg font-bold tracking-tight text-[#001809]">
            {t("admin.brand")}
          </span>
        </div>
        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label={t("admin.layout.closeMenu")}
            className="rounded-md p-1 text-[#6B7280] transition-colors hover:bg-surface-card"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                isActive
                  ? "bg-mint text-primary-dark"
                  : "text-[#424842] hover:bg-surface-card hover:text-[#001809]"
              }`
            }
          >
            <item.icon size={17} aria-hidden="true" />
            <span>{t(item.key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 border-t border-[#EDF0ED] p-3">
        <div className="mb-2 flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {(user?.name || "U").charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#001809]">
              {user?.name || "Admin"}
            </p>
            <p className="truncate text-xs text-[#6B7280]">{user?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-[#424842] transition-colors outline-none hover:bg-red-50 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-500/40 disabled:opacity-60"
        >
          <LogOut size={16} aria-hidden="true" />
          {t("admin.signOut")}
        </button>
      </div>
    </aside>
  );
}
