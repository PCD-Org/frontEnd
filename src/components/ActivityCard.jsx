import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import defaultImage from "../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

const categoryColors = {
  workshops: "bg-red-100 text-red-700",
  psycho: "bg-green-100 text-green-700",
  relief: "bg-blue-100 text-blue-700",
  development: "bg-amber-100 text-amber-800",
};

export default function ActivityCard({
  id,
  image,
  coverImage,
  category,
  title,
  description,
  date,
  link,
}) {
  const { t, dir, language } = useTranslation();
  const resolvedImage =
    (typeof coverImage === "object" && coverImage !== null ? coverImage.url : coverImage) ||
    image ||
    defaultImage;
  const [imgSrc, setImgSrc] = useState(resolvedImage);

  const targetLink = link || (id ? `/activities/${id}` : "#");

  // Multilingual unwrapping with fallbacks
  const displayTitle =
    typeof title === "object" && title !== null
      ? title[language] || title.ar || title.en || ""
      : typeof title === "string"
      ? title.startsWith("activities.")
        ? t(title)
        : title
      : "";

  const displayDescription =
    typeof description === "object" && description !== null
      ? description[language] || description.ar || description.en || ""
      : typeof description === "string"
      ? description.startsWith("activities.")
        ? t(description)
        : description
      : "";

  const categoryLabel = category
    ? t(`activities.cat.${category}`) !== `activities.cat.${category}`
      ? t(`activities.cat.${category}`)
      : t(`categories.${category}`) !== `categories.${category}`
      ? t(`categories.${category}`)
      : category
    : "";

  const badgeColor =
    categoryColors[category] || "bg-[#E6F4EA] text-[#0D3B2E]";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={targetLink}
        className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-[#0D3B2E] rounded-2xl"
      >
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <img
            src={imgSrc}
            alt={displayTitle || "Activity"}
            onError={() => setImgSrc(defaultImage)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {categoryLabel && (
            <span
              className={`absolute start-4 top-4 rounded-full px-3 py-1 text-xs font-semibold shadow-xs ${badgeColor}`}
            >
              {categoryLabel}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6 text-start">
          {/* Date */}
          {date && (
            <div className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={date}>{date}</time>
            </div>
          )}

          {/* Title */}
          <h3 className="mb-3 text-xl font-bold leading-snug text-[#001809] transition-colors group-hover:text-[#006c48]">
            {displayTitle}
          </h3>

          {/* Description */}
          <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
            {displayDescription}
          </p>

          {/* Read More Link */}
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#006c48] transition group-hover:text-[#081c15]">
            <span>{t("activityCard.readMore")}</span>
            {dir === "rtl" ? (
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            ) : (
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
