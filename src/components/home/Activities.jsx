import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "../ActivityCard";
import CategoryFilter from "../CategoryFilter";
import { categories, activitiesData } from "../../activitiesData";
import { useTranslation } from "../../utils/useTranslation";


const Activities = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredActivities = activeCategory === "all"
    ? activitiesData
    : activitiesData.filter(activity => activity.category === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-5 py-20 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col lg:flex-row-reverse justify-between items-center mb-16 gap-8"
      >
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          variant="container"
        />
        
        <div className="text-start flex-1">
          <h2 className="text-[40px] font-bold text-[#0D3B2E] leading-tight">
            {t("homeActivities.title")}
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            {t("homeActivities.subtitle")}
          </p>
        </div>
      </motion.div>

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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <ActivityCard
                  image={item.image}
                  category={item.category}
                  title={t(item.titleKey)}
                  description={t(item.descriptionKey)}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-12 text-gray-500 text-lg"
            >
              {t("homeActivities.empty")} "{t(categories.find(c => c.slug === activeCategory)?.nameKey)}".
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex justify-center mt-20">
        <button 
          className="border-2 border-[#0D3B2E] text-[#0D3B2E] px-12 py-3 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition-all duration-300 shadow-sm hover:scale-[1.04] active:scale-95"
        >
          {t("homeActivities.viewAll")}
        </button>
      </div>

     
    </section>
  );
};

export default Activities;
