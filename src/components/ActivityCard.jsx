import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";

const ActivityCard = ({ image, category, title, description, date, link = "#" }) => {
   const { t, dir } = useTranslation();
   const categoryColors = {
  "workshops": "bg-red-100 text-red-700",
  "psycho": "bg-green-100 text-green-700",
  "relief": "bg-blue-100 text-blue-700",
  };
  const badgeColor = categoryColors[category] || "bg-gray-100 text-gray-700";
    return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover"
        />

        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-l font-semibold ${badgeColor}`}>
          {t(`activities.cat.${category}`)}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 text-start">
        {/* Date  */}
        {date && (
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium mb-2.5">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 leading-8 mb-3">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-7 flex-1">
          {description}
        </p>

        <a
          href={link}
          className="mt-6 inline-flex items-center justify-first gap-2 text-green-700 font-semibold hover:text-green-900 transition"
        >
          {t("activityCard.readMore")}
          {dir === "rtl" ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
