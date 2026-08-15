
// export default function Activities() {
//   return (
//     <div>Activities Page</div>
//   )
// }
import { useState } from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import CategoryFilter from '../components/CategoryFilter';
import ActivityCard from '../components/ActivityCard';
import { categories, activitiesData } from '../activitiesData';
import { motion, AnimatePresence } from "framer-motion";


export default function Activities() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const filteredActivities = activeCategory === "الكل"
    ? activitiesData
    : activitiesData.filter(activity => activity.category === activeCategory);

  return (
    <div>
      <PageHeader 
        variant="dark"
        title="برامج الدعم والمساندة"
        description="نحن في المركز الفلسطيني للتنمية البيئية نؤمن بأن الصمود يبدأ من تمكين المجتمع. تشمل برامجنا التدخلات العاجلة والمستدامة لتعزيز قدرة شعبنا على مواجهة التحديات البيئية والاجتماعية من خلال التنمية المدروسة والدعم المباشر."
        breadcrumbs={[{ label: 'الأنشطة' }]}
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
                    title={item.title}
                    date={item.date}
                    description={item.description}
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
                لا توجد أنشطة حالية في فئة "{categories.find(c => c.slug === activeCategory)?.name}".
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}