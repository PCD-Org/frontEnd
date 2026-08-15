import { Link } from "react-router-dom";
import { Images, Newspaper, CalendarDays, BookOpen, ArrowUpRight } from "lucide-react";

const toneMap = {
  media: "bg-mint text-primary-dark",
  news: "bg-[#F3E8D8] text-[#79552C]",
  activities: "bg-[#E8F1F6] text-[#2A5A78]",
  research: "bg-[#EFE8F4] text-[#5B3A6E]",
};

const iconMap = {
  media: Images,
  news: Newspaper,
  activities: CalendarDays,
  research: BookOpen,
};

export default function StatCard({ label, value, type, loading }) {
  const Icon = iconMap[type];
  const href =
    type === "media"
      ? "/admin/media"
      : type === "news"
      ? "/admin/news"
      : type === "activities"
      ? "/admin/activities"
      : "/admin/research";

  return (
    <Link
      to={href}
      className="group rounded-xl border border-[#E5E7E5] bg-white p-5 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,24,9,0.06)]"
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneMap[type]}`}
        >
          <Icon size={19} aria-hidden="true" />
        </span>
        <ArrowUpRight
          size={16}
          className="text-[#9CA3AF] transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-[#001809]">
        {loading ? "…" : value}
      </p>
      <p className="mt-0.5 text-sm font-medium text-[#6B7280]">{label}</p>
    </Link>
  );
}
