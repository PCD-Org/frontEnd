import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Share2,
  AlertTriangle,
  FileQuestion,
  RotateCcw,
  Check,
  Star,
  Images as ImagesIcon,
} from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useActivity, useActivities } from "../features/activities/useActivities";
import ActivityCard from "../components/ActivityCard";
import ActivityImage from "../components/ui/ActivityImage";
import { isSpecialEventActivity } from "../utils/eventClassifier";

const categoryColors = {
  workshops: "bg-red-100 text-red-800 border-red-200",
  psycho: "bg-green-100 text-green-800 border-green-200",
  psychosocial: "bg-green-100 text-green-800 border-green-200",
  relief: "bg-blue-100 text-blue-800 border-blue-200",
  development: "bg-amber-100 text-amber-800 border-amber-200",
  events: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function ActivityDetailsPage() {
  const { id } = useParams();
  const { t, dir, language } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [prevId, setPrevId] = useState(id);

  const { data: activity, isLoading, isError, error, refetch, isFetching } = useActivity(id);
  const { list: allActivitiesQuery } = useActivities();

  // Reset active image on activity id change
  if (prevId !== id) {
    setPrevId(id);
    setActiveImageIndex(0);
  }

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
      <>
        <SEO title="جاري التحميل..." description="جاري تحميل تفاصيل النشاط..." />
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
          <div className="mb-10 h-[420px] w-full animate-pulse rounded-3xl bg-gray-200 sm:h-[560px]" />

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
      </>
    );
  }

  // 404 NOT FOUND STATE
  const is404 = error?.response?.status === 404 || (!isLoading && !activity);
  if (is404) {
    return (
      <>
        <SEO title="النشاط غير موجود" noindex={true} />
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
      </>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <>
        <SEO title="خطأ في تحميل النشاط" noindex={true} />
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
      </>
    );
  }

  // SUCCESSFUL DATA PRESENTATION
  const displayTitle = getLocalized(activity.title, activity.titleKey);
  const displayDescription = getLocalized(activity.description || activity.summary, activity.descriptionKey);

  const rawCat = typeof activity.category === "object" ? activity.category?.key : activity.category;
  const isEvent =
    rawCat === "events" ||
    isSpecialEventActivity(activity);

  const categorySlug = isEvent
    ? "events"
    : rawCat === "psycho"
    ? "psychosocial"
    : rawCat;

  const categoryLabel =
    (categorySlug === "events"
      ? language === "ar"
        ? "فعاليات ومناسبات"
        : "Events & Occasions"
      : typeof activity.category === "object" && activity.category?.name?.[language]) ||
    (categorySlug && t(`activities.cat.${categorySlug}`) !== `activities.cat.${categorySlug}`
      ? t(`activities.cat.${categorySlug}`)
      : categorySlug && t(`categories.${categorySlug}`) !== `categories.${categorySlug}`
      ? t(`categories.${categorySlug}`)
      : categorySlug === "psychosocial" || categorySlug === "psycho"
      ? language === "ar"
        ? "الدعم النفسي"
        : "Psychological Support"
      : categorySlug || "");

  const badgeStyle =
    categoryColors[categorySlug] || categoryColors[rawCat] || "bg-[#E6F4EA] text-[#0D3B2E] border-transparent";

  // Gather all images (new schema images array or fallback to coverImage/image)
  const allImages =
    Array.isArray(activity.images) && activity.images.length > 0
      ? activity.images
      : [activity.coverImage || activity.image].filter(Boolean);

  const currentImage = allImages[activeImageIndex] || allImages[0] || null;

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev <= 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev >= allImages.length - 1 ? 0 : prev + 1));
  };

  // Related activities (excluding current)
  const relatedActivities = (allActivitiesQuery.data || [])
    .filter((act) => String(act.id) !== String(id))
    .slice(0, 3);

  return (
    <>
      <SEO
        title={displayTitle || "تفاصيل النشاط"}
        description={
          displayDescription
            ? displayDescription.replace(/\r?\n+/g, " ").slice(0, 160)
            : "تفاصيل نشاط من أنشطة الهيئة الأهلية الفلسطينية للبيئة والتنمية والتطوير (PCED)"
        }
        canonical={`https://www.pcedpal.org/activities/${id}`}
        image={currentImage || "/favicon.png"}
        type="article"
      />
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

          {/* Hero Image / Gallery Section */}
          <div className="relative w-full bg-gray-100">
            {/* Main Active Image Display: الصورة كاملة بدون قص فوق خلفية ضبابية */}
            <div className="relative w-full overflow-hidden bg-gray-950/5">
              <ActivityImage
                src={currentImage}
                alt={displayTitle}
                fit="blur"
                containerClassName="h-[420px] sm:h-[560px] w-full"
                className="transition-all duration-300"
                fallbackClassName="h-72 sm:h-96 w-full object-contain p-12"
                loading="eager"
              />

              {/* Cover badge if showing first image */}
              {activeImageIndex === 0 && (
                <span className="absolute start-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-[#0D3B2E]/90 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-xs">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span>{t("activitiesPage.details.coverImageLabel") || "صورة الغلاف"}</span>
                </span>
              )}

              {/* Multiple Images Controls & Counter */}
              {allImages.length > 1 && (
                <>
                  <div
                    className="absolute end-4 top-4 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-xs"
                    dir="ltr"
                  >
                    <ImagesIcon size={12} />
                    <span>
                      {activeImageIndex + 1} / {allImages.length}
                    </span>
                  </div>

                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={dir === "rtl" ? handleNextImage : handlePrevImage}
                    aria-label="Previous Image"
                    className="absolute start-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white shadow-md backdrop-blur-xs transition hover:bg-black/75 hover:scale-105 active:scale-95"
                  >
                    {dir === "rtl" ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={dir === "rtl" ? handlePrevImage : handleNextImage}
                    aria-label="Next Image"
                    className="absolute end-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white shadow-md backdrop-blur-xs transition hover:bg-black/75 hover:scale-105 active:scale-95"
                  >
                    {dir === "rtl" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (if multiple images) */}
            {allImages.length > 1 && (
              <div className="border-t border-gray-200/80 bg-white/90 p-3 backdrop-blur-xs">
                <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-thin">
                  {allImages.map((imgUrl, idx) => {
                    const isActive = idx === activeImageIndex;
                    const isCover = idx === 0;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`group relative shrink-0 overflow-hidden rounded-xl transition-all duration-200 focus:outline-none ${
                          isActive
                            ? "ring-2 ring-[#006c48] ring-offset-2 scale-102 opacity-100 shadow-sm"
                            : "opacity-60 hover:opacity-100 hover:scale-102"
                        }`}
                      >
                        <ActivityImage
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fit="blur"
                          containerClassName="h-16 w-20 sm:h-[72px] sm:w-24 bg-gray-100"
                          fallbackClassName="h-full w-full object-contain p-2"
                        />
                        {isCover && (
                          <span className="absolute bottom-1 start-1 z-10 rounded bg-[#0D3B2E]/90 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-xs">
                            {t("activitiesPage.details.coverImageLabel") || "غلاف"}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
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
                  images={item.images}
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
    </>
  );
}