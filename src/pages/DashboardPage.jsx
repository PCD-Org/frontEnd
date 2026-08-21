import { Link } from "react-router-dom";
import { useTranslation } from "../utils/useTranslation";
import { useDashboard } from "../features/dashboard/useDashboard";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import StatCard from "../features/dashboard/StatCard";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import Badge from "../components/ui/admin/Badge";
import ActivityImage from "../components/ui/ActivityImage";
import {
  CalendarDays,
  Mail,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { categoryLabelKey } from "../features/activities/categories";

const toneMap = {
  new: "warning",
  read: "info",
  replied: "success",
};

export default function DashboardPage() {
  const { t, language, dir } = useTranslation();
  const { summary } = useDashboard();
  const { data, isLoading, isError, refetch } = summary;

  const statItems = [
    {
      type: "activities",
      key: "admin.dashboard.totalActivities",
      value: data?.totalActivities ?? 0,
    },
    {
      type: "impactStats",
      key: "admin.dashboard.totalImpactStats",
      value: data?.totalImpactStats ?? 0,
    },
    {
      type: "inquiries",
      key: "admin.dashboard.totalInquiries",
      value: data?.totalInquiries ?? 0,
    },
    {
      type: "newInquiries",
      key: "admin.dashboard.newInquiries",
      value: data?.newInquiries ?? 0,
    },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={t("admin.nav.dashboard")}
        subtitle={t("admin.dashboard.subtitle")}
      />

      {API_MODE === "mock" && (
        <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.dashboard.modeNote")}
        </p>
      )}

      {isError ? (
        <ErrorState message={t("common.error")} onRetry={() => refetch()} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statItems.map((item) => (
            <StatCard
              key={item.type}
              type={item.type}
              label={t(item.key) || item.key}
              value={item.value}
              loading={isLoading}
            />
          ))}
        </div>
      )}

      {/* Recent Activities & Recent Inquiries Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <section className="rounded-xl border border-[#E5E7E5] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#001809]">
              {t("admin.dashboard.recentActivities") || "أحدث الأنشطة"}
            </h2>
            <Link
              to="/admin/activities"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#006c48] hover:text-[#081c15]"
            >
              <span>{t("admin.dashboard.viewAll") || "عرض الكل"}</span>
              {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner label={t("common.loading")} />
            </div>
          ) : data?.recentActivities?.length ? (
            <div className="divide-y divide-[#EDF0ED]">
              {data.recentActivities.map((act) => {
                const title =
                  language === "ar"
                    ? act.titleAr || (typeof act.title === "object" ? act.title?.ar : act.title)
                    : act.titleEn || (typeof act.title === "object" ? act.title?.en : act.titleAr || act.title);
                const img = act.coverImage || act.image;

                return (
                  <div
                    key={act.id || act._id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <ActivityImage
                        src={img}
                        alt={title}
                        containerClassName="h-10 w-12 shrink-0 rounded-lg border border-[#E5E7E5]"
                        className="h-10 w-12 object-cover"
                        fallbackClassName="h-10 w-12 object-contain p-1"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#001809]">
                          {title}
                        </p>
                        <p className="text-xs text-[#6B7280]">{act.date}</p>
                      </div>
                    </div>

                    <Badge tone="muted">
                      {categoryLabelKey(act.category)
                        ? t(categoryLabelKey(act.category))
                        : act.category}
                    </Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={CalendarDays}
              title={t("admin.activities.empty")}
              hint={t("admin.activities.emptyHint")}
            />
          )}
        </section>

        {/* Recent Contact Inquiries */}
        <section className="rounded-xl border border-[#E5E7E5] bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#001809]">
              {t("admin.dashboard.recentInquiries") || "أحدث الرسائل والاستفسارات"}
            </h2>
            <Link
              to="/admin/contact-inquiries"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#006c48] hover:text-[#081c15]"
            >
              <span>{t("admin.dashboard.viewAll") || "عرض الكل"}</span>
              {dir === "rtl" ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner label={t("common.loading")} />
            </div>
          ) : data?.recentInquiries?.length ? (
            <div className="divide-y divide-[#EDF0ED]">
              {data.recentInquiries.map((inq) => {
                const statusLabel =
                  inq.status === "new"
                    ? t("admin.inquiries.statusNew") || "جديد"
                    : inq.status === "read"
                    ? t("admin.inquiries.statusRead") || "مقروء"
                    : inq.status === "replied"
                    ? t("admin.inquiries.statusReplied") || "تم الرد"
                    : inq.status;

                return (
                  <div
                    key={inq.id || inq._id}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#001809] truncate">
                        {inq.name}
                      </p>
                      <p className="truncate text-xs text-[#6B7280] max-w-xs">
                        {inq.message}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <Badge tone={toneMap[inq.status] || "muted"}>
                        {statusLabel}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={Mail}
              title={t("admin.inquiries.empty") || "لا توجد رسائل بعد"}
              hint={t("admin.inquiries.emptyHint") || "لم يتم استلام رسائل بعد."}
            />
          )}
        </section>
      </div>
    </div>
  );
}
