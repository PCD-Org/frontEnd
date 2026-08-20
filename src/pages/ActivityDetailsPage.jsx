import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  Share2,
  AlertTriangle,
  FileQuestion,
  RotateCcw,
  Check,
} from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useActivity, useActivities } from "../features/activities/useActivities";
import defaultImage from "../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";
import ActivityCard from "../components/ActivityCard";

const categoryColors = {
  workshops: "bg-red-100 text-red-800 border-red-200",
  psycho: "bg-green-100 text-green-800 border-green-200",
  relief: "bg-blue-100 text-blue-800 border-blue-200",
  development: "bg-amber-100 text-amber-800 border-amber-200",
};

export default function ActivityDetailsPage() {
  const { id } = useParams();
  const { t, dir, language } = useTranslation();
  const [copied, setCopied] = useState(false);

  const { data: activity, isLoading, isError, error, refetch, isFetching } = useActivity(id);
  const { list: allActivitiesQuery } = useActivities();

  const [imgSrc, setImgSrc] = useState(null);

  const handleShare = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        /* ignore */
      }
    }
  };

  // Helper for multilingual strings
  const getLocalized = (val) => {
    if (!val) return "";
    if (typeof val === "object") {
      return val[language] || val.ar || val.en || "";
    }
    if (typeof val === "string") {
      if (val.startsWith("activities.")) return t(val);
      return val;
    }
    return "";
  };

  // SKELETON STATE
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#FBFBFA] py-12">
        <div className="mx-auto max-w-5xl px-5">
          {/* Breadcrumb Skeleton */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Category & Date Skeleton */}
          <div className="mb-4 flex items-center gap-4">
            <div className="h-7 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Title Skeleton */}
          <div className="mb-3 h-10 w-4/5 animate-pulse rounded-lg bg-gray-200" />
          <div className="mb-8 h-10 w-2/3 animate-pulse rounded-lg bg-gray-200" />

          {/* Hero Image Skeleton */}
          <div className="mb-10 h-72 w-full animate-pulse rounded-3xl bg-gray-200 sm:h-96 md:h-[450px]" />

          {/* Description Paragraphs Skeleton */}
          <div className="space-y-4 rounded-2xl bg-white p-8 shadow-xs">
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
            <div className="pt-4" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  // 404 NOT FOUND STATE
  const is404 = error?.response?.status === 404 || (!isLoading && !activity);
  if (is404) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FBFBFA] px-5 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <FileQuestion size={40} aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-[#001809]">
            {t("activitiesPage.details.notFoundTitle")}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {t("activitiesPage.details.notFoundDesc")}
          </p>
          <div className="mt-8">
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 rounded-full bg-[#0D3B2E] px-8 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#006c48] hover:shadow-md active:scale-95"
            >
              {dir === "rtl" ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
              <span>{t("activitiesPage.details.back")}</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FBFBFA] px-5 py-16">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertTriangle size={32} aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold text-[#001809]">
            {t("activitiesPage.details.errorTitle")}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t("activitiesPage.details.errorMessage")}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-full bg-[#0D3B2E] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#006c48] active:scale-95 disabled:opacity-50"
            >
              <RotateCcw size={15} className={isFetching ? "animate-spin" : ""} />
              <span>{t("activitiesPage.retry")}</span>
            </button>
            <Link
              to="/activities"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {t("activitiesPage.details.back")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // SUCCESSFUL DATA PRESENTATION
  const displayTitle = getLocalized(activity.title, activity.titleKey);
  const displayDescription = getLocalized(activity.description || activity.summary, activity.descriptionKey);
  const currentImage = imgSrc || activity.coverImage || activity.image || defaultImage;

  const categorySlug = activity.category;
  const categoryLabel = categorySlug
    ? t(`activities.cat.${categorySlug}`) !== `activities.cat.${categorySlug}`
      ? t(`activities.cat.${categorySlug}`)
      : t(`categories.${categorySlug}`) !== `categories.${categorySlug}`
      ? t(`categories.${categorySlug}`)
      : categorySlug
    : "";

  const badgeStyle = categoryColors[categorySlug] || "bg-[#E6F4EA] text-[#0D3B2E] border-transparent";

  // Related activities (excluding current)
  const relatedActivities = (allActivitiesQuery.data || [])
    .filter((act) => String(act.id) !== String(id))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FBFBFA] py-10 lg:py-16">
      <div className="mx-auto max-w-5xl px-5">
        {/* Top Navigation & Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/activities"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#006c48] transition-colors hover:text-[#081c15]"
          >
            {dir === "rtl" ? (
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            )}
            <span>{t("activitiesPage.details.back")}</span>
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-2xs transition hover:border-[#006c48] hover:text-[#006c48] active:scale-95"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span className="text-emerald-600">تم النسخ!</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>{t("activitiesPage.details.share")}</span>
              </>
            )}
          </button>
        </nav>

        {/* Activity Article Header */}
        <article className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          {/* Metadata Header */}
          <div className="p-6 text-start sm:p-10">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {categoryLabel && (
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold ${badgeStyle}`}
                >
                  <Tag size={12} aria-hidden="true" />
                  <span>{categoryLabel}</span>
                </span>
              )}

              {activity.date && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <Calendar size={14} aria-hidden="true" />
                  <time dateTime={activity.date}>{activity.date}</time>
                </div>
              )}
            </div>

            <h1 className="font-serif text-2xl font-bold leading-relaxed text-[#001809] sm:text-3xl sm:leading-tight lg:text-4xl">
              {displayTitle}
            </h1>
          </div>

          {/* Hero Cover Image */}
          <div className="relative w-full bg-gray-100">
            <img
              src={currentImage}
              alt={displayTitle}
              onError={() => setImgSrc(defaultImage)}
              className="max-h-[500px] w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Article Body */}
          <div className="p-6 text-start sm:p-10">
            <div className="prose prose-lg max-w-none text-[#2C332D]">
              <p className="text-base leading-8 sm:text-lg sm:leading-9 whitespace-pre-line">
                {displayDescription}
              </p>
            </div>

            {/* Institutional Endnote */}
            <div className="mt-12 border-t border-gray-100 pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500">
                <span>
                  {t("activitiesPage.details.category")}: <strong className="text-gray-700">{categoryLabel || "—"}</strong>
                </span>
                <span>
                  {t("activitiesPage.details.date")}: <strong className="text-gray-700">{activity.date || "—"}</strong>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Related / Other Activities Section */}
        {relatedActivities.length > 0 && (
          <section className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#001809]">
                {t("activitiesPage.details.related")}
              </h2>
              <Link
                to="/activities"
                className="text-sm font-semibold text-[#006c48] hover:underline"
              >
                {t("homeActivities.viewAll")}
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedActivities.map((item) => (
                <ActivityCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  coverImage={item.coverImage}
                  category={item.category}
                  title={item.title || item.titleAr}
                  date={item.date}
                  description={item.description || item.summary}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
