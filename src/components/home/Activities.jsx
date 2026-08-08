import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ActivityCard from "../ActivityCard";
import CategoryFilter from "../CategoryFilter";

const activitiesData = [
  {
    id: 1,
    image: "/src/assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg",
    category: "ورشات",
    title: "جلسة حوارية حول واقع التعليم والتنمية في غزة",
    description: "مشاركة خبراء وأكاديميين في وضع خارطة طريق لتحسين المنظومة التعليمية والبيئية في ظل التحديات الراهنة.",
  },
  {
    id: 2,
    image: "/src/assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg",
    category: "دعم نفسي",
    title: "جلسات تفريغ نفسي بالتعاون مع مركز شؤون المرأة",
    description: "تنفيذ ورشات عمل متخصصة للدعم النفسي والاجتماعي للفئات الأكثر هشاشة لتعزيز الصحة النفسية المجتمعية.",
  },
  {
    id: 3,
    image: "/src/assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg",
    category: "إغاثة",
    title: "الهيئة وصندوق الاستثمار الفلسطيني يوزعون طروداً غذائية",
    description: "توزيع مساعدات غذائية طارئة للعائلات المتضررة في غزة لتعزيز صمودهم وتلبية احتياجاتهم الأساسية.",
  },
];

const categories = [
  { name: "الكل", slug: "الكل" },
  { name: "مشاريع إغاثية", slug: "إغاثة" },
  { name: "تنموية", slug: "تنموية" },
  { name: "ورشات عمل", slug: "ورشات" },
];

const Activities = () => {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const filteredActivities = activeCategory === "الكل"
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
        />
        
        <div className="text-right flex-1">
          <h2 className="text-[40px] font-bold text-[#0D3B2E] leading-tight">
            آخر الأنشطة والمشاريع
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            مشاريعنا الحالية وجهودنا المستمرة في الميدان
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
                  title={item.title}
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

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mt-20"
      >
        <motion.button 
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="border-2 border-[#0D3B2E] text-[#0D3B2E] px-12 py-3 rounded-full font-semibold hover:bg-[#0D3B2E] hover:text-white transition duration-300 shadow-sm"
        >
          مشاهدة كافة الأنشطة
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Activities;