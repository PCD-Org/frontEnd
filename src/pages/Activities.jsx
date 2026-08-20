import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import CategoryFilter from "../components/CategoryFilter";
import ActivityCard from "../components/ActivityCard";
import ActivityCardSkeleton from "../components/ActivityCardSkeleton";
import { categories } from "../activitiesData";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../utils/useTranslation";
import { useActivities } from "../features/activities/useActivities";
import { AlertTriangle, CalendarX, RotateCcw } from "lucide-react";

export default function Activities() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const { list } = useActivities();
  const { data: activities = [], isLoading, isError, refetch, isFetching } = list;

  const filteredActivities =
    activeCategory === "all"
      ? activities
      : activities.filter((activity) => activity.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FBFBFA]">
      <PageHeader
        variant="dark"
        title={t("activitiesPage.title")}
        description={t("activitiesPage.desc")}
      />

      <div className="mx-auto max-w-7xl px-5 py-12">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          variant="pills"
        />

        {/* LOADING STATE - SKELETON */}
        {isLoading && (
          <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ActivityCardSkeleton key={idx} />
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && isError && (
          <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-red-100 bg-white p-12 text-center shadow-xs">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle size={32} aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-[#001809]">
              {t("activitiesPage.errorTitle")}
            </h3>
            <p className="mt-2 max-w-md text-sm text-gray-600">
              {t("activitiesPage.errorMessage")}
            </p>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0D3B2E] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#006c48] active:scale-95 disabled:opacity-50"
            >
              <RotateCcw size={16} className={isFetching ? "animate-spin" : ""} />
              <span>{t("activitiesPage.retry")}</span>
            </button>
          </div>
        )}

        {/* DATA LOADED */}
        {!isLoading && !isError && (
          <motion.div
            layout
            className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ActivityCard
                      id={item.id}
                      image={item.image}
                      coverImage={item.coverImage}
                      category={item.category}
                      title={item.title || item.titleAr}
                      date={item.date}
                      description={item.description || item.summary}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white py-16 text-center shadow-xs"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-[#0D3B2E]">
                    <CalendarX size={32} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[#001809]">
                    {t("activitiesPage.emptyTitle")}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {activeCategory !== "all"
                      ? `${t("homeActivities.empty")} "${t(
                          categories.find((c) => c.slug === activeCategory)?.nameKey
                        )}".`
                      : t("activitiesPage.emptyDesc")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
