import { motion } from "framer-motion";

const CategoryFilter = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <div className="bg-[#F4F5F0] p-1.5 rounded-full flex items-center gap-1 dir-rtl overflow-x-auto">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`relative px-6 py-2.5 rounded-full text-base font-semibold transition-colors duration-200 z-10 whitespace-nowrap ${
              isActive ? "text-white" : "text-gray-700 hover:text-[#0D3B2E]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#0D3B2E] rounded-full z-[-1] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;