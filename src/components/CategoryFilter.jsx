import { motion } from "framer-motion";
import { useTranslation } from "../utils/useTranslation";

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onSelectCategory, 
  variant = "pills" 
}) => {
  const { t } = useTranslation();
  const isPills = variant === "pills";

  return (
    <div
      className={`flex items-center overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
        isPills ? "border-b border-gray-100 pb-4 mb-6 md:pb-5 md:mb-8" : ""
      } ${
        isPills
          ? "gap-2 md:gap-3 justify-start px-1" 
          : "bg-[#F4F5F0] p-1.5 rounded-full gap-1" 
      }`}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.slug;
        const buttonStyles = isActive
          ? "text-white"
          : isPills
          ? "border border-gray-200 bg-[#F4F5F0] text-gray-700 hover:bg-[#e8e9e3] hover:text-[#0D3B2E]"
          : "text-gray-700 hover:text-[#0D3B2E]";

        return (
          <button
            key={cat.slug}
            onClick={() => onSelectCategory(cat.slug)}
            className={`relative px-3.5 py-1.5 md:px-6 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-colors duration-200 z-10 whitespace-nowrap shrink-0 ${buttonStyles}`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#0D3B2E] rounded-full z-[-1] shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t(cat.nameKey)}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;