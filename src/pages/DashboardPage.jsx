import { Link } from "react-router-dom";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useDashboard } from "../features/dashboard/useDashboard";
import { API_MODE } from "../utils/api";
import { formatBytes } from "../utils/mock";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import StatCard from "../features/dashboard/StatCard";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import { Images } from "lucide-react";

const statTypes = [
  { type: "media", key: "admin.dashboard.totalMedia" },
  { type: "news", key: "admin.dashboard.totalNews" },
  { type: "activities", key: "admin.dashboard.totalActivities" },
  { type: "research", key: "admin.dashboard.totalResearch" },
];

export default function DashboardPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { stats, recentMedia } = useDashboard();

  const hasAnyRead = [
    "media.read",
    "news.read",
    "activities.read",
    "research.read",
  ].some((p) => can(p));

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.dashboard")}
        subtitle={t("admin.dashboard.subtitle")}
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.dashboard.modeNote")}
        </p>
      )}

      {stats.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => stats.refetch()} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statTypes.map((item) => (
            <StatCard
              key={item.type}
              type={item.type}
              label={t(item.key)}
              value={stats.data?.[item.type] ?? 0}
              loading={stats.isLoading}
            />
          ))}
        </div>
      )}

      {hasAnyRead && (
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#001809]">
              {t("admin.dashboard.recentMedia")}
            </h2>
            {can("media.read") && (
              <Link
                to="/admin/media"
                className="text-sm font-semibold text-[#006c48] hover:text-[#081c15]"
              >
                {t("admin.nav.media")}
              </Link>
            )}
          </div>

          {recentMedia.isError ? (
            <ErrorState
              message={t("common.error")}
              onRetry={() => recentMedia.refetch()}
            />
          ) : recentMedia.isLoading ? (
            <div className="flex justify-center py-12">
              <Spinner label={t("common.loading")} />
            </div>
          ) : recentMedia.data?.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {recentMedia.data.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-[#E5E7E5] bg-white"
                >
                  <div className="flex h-28 items-center justify-center overflow-hidden bg-surface-card">
                    <img
                      src={item.url}
                      alt={item.filename}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-3 py-2.5">
                    <p className="truncate text-xs font-semibold text-[#001809]">
                      {item.filename}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#6B7280]">
                      {formatBytes(item.size) ?? item.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Images}
              title={t("admin.media.empty")}
              hint={t("admin.media.emptyHint")}
            />
          )}
        </section>
      )}
    </div>
  );
}
