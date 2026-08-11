import { motion } from "framer-motion";

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onSelectCategory, 
  variant = "pills" 
}) => {
  const isPills = variant === "pills";

  return (
    <div
      className={`flex items-center dir-rtl overflow-x-auto ${isPills ? "border-b border-gray-100 pb-5 mb-8" : ""} ${
        isPills
          ? "gap-3  justify-start " 
          : "bg-[#F4F5F0] p-1.5 rounded-full gap-1" 
      }`}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const buttonStyles = isActive
          ? "text-white"
          : isPills
          ? "border border-gray-200  bg-[#F4F5F0] text-gray-700 hover:bg-[#e8e9e3] hover:text-[#0D3B2E]"
          : "text-gray-700 hover:text-[#0D3B2E]";

        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`relative px-6 py-2.5 rounded-full text-base font-semibold transition-colors duration-200 z-10 whitespace-nowrap ${buttonStyles}`}
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