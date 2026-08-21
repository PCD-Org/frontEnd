import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import CategoryFilter from '../components/CategoryFilter';
import ActivityCard from '../components/ActivityCard';
import { categories, activitiesData } from '../activitiesData';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from '../utils/useTranslation';
import Newsletter from '../components/ui/Newsletter';


export default function Activities() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredActivities = activeCategory === "all"
    ? activitiesData
    : activitiesData.filter(activity => activity.category === activeCategory);

  return (
    <div>
      <PageHeader 
        variant="dark"
        title={t("activitiesPage.title")}
        description={t("activitiesPage.desc")}
      />

      <div className="max-w-7xl mx-auto px-5 py-12 ">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onSelectCategory={setActiveCategory} 
          variant="pills" 
        />
  
        <motion.div 
          layout 
          className="grid gap-x-8 gap-y-12 mt-24 md:grid-cols-2 lg:grid-cols-3"
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
                    date={item.date}
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
      </div>
       <Newsletter/>
    </div>
  );
}
