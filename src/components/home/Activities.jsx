import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "../ActivityCard";
import ActivityCardSkeleton from "../ActivityCardSkeleton";
import CategoryFilter from "../CategoryFilter";
import { categories } from "../../activitiesData";
import { useTranslation } from "../../utils/useTranslation";
import { useActivities } from "../../features/activities/useActivities";
import { AlertTriangle, CalendarX, RotateCcw } from "lucide-react";

const Activities = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const { list } = useActivities();
  const { data: activities = [], isLoading, isError, refetch, isFetching } = list;

  const filteredActivities =
    activeCategory === "all"
      ? activities.slice(0, 6)
      : activities.filter((activity) => activity.category === activeCategory).slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl overflow-hidden bg-white px-5 py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16 flex flex-col items-center justify-between gap-8 lg:flex-row-reverse"
      >
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          variant="container"
        />

        <div className="flex-1 text-start">
          <h2 className="text-[40px] font-bold leading-tight text-[#0D3B2E]">
            {t("homeActivities.title")}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {t("homeActivities.subtitle")}
          </p>
        </div>
      </motion.div>

      {/* SKELETON LOADING STATE */}
      {isLoading && (
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, idx) => (
            <ActivityCardSkeleton key={idx} />
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {!isLoading && isError && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xs">
          <AlertTriangle size={32} className="mb-2 text-red-500" aria-hidden="true" />
          <p className="text-sm font-semibold text-gray-700">
            {t("activitiesPage.errorMessage")}
          </p>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#0D3B2E] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#006c48]"
          >
            <RotateCcw size={14} className={isFetching ? "animate-spin" : ""} />
            <span>{t("activitiesPage.retry")}</span>
          </button>
        </div>
      )}

      {/* LOADED ACTIVITIES */}
      {!isLoading && !isError && (
        <motion.div
          layout
          className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
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
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
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
                className="col-span-full flex flex-col items-center justify-center py-12 text-center text-gray-500"
              >
                <CalendarX size={28} className="mb-2 text-gray-400" />
                <p>
                  {t("homeActivities.empty")} "
                  {t(categories.find((c) => c.slug === activeCategory)?.nameKey)}".
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="mt-20 flex justify-center">
        <Link
          to="/activities"
          className="rounded-full border-2 border-[#0D3B2E] px-12 py-3 font-semibold text-[#0D3B2E] shadow-xs transition-all duration-300 hover:scale-[1.04] hover:bg-[#0D3B2E] hover:text-white active:scale-95"
        >
          {t("homeActivities.viewAll")}
        </Link>
      </div>
    </section>
  );
};

export default Activities;
