import { Link } from "react-router-dom";
import {
  CalendarDays,
  BarChart3,
  Mail,
  MessageSquare,
  Images,
  Newspaper,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

const toneMap = {
  activities: "bg-[#E8F1F6] text-[#2A5A78]",
  impactStats: "bg-[#EFE8F4] text-[#5B3A6E]",
  inquiries: "bg-mint text-primary-dark",
  newInquiries: "bg-[#FBE8E8] text-[#C53030]",
  media: "bg-mint text-primary-dark",
  news: "bg-[#F3E8D8] text-[#79552C]",
  research: "bg-[#EFE8F4] text-[#5B3A6E]",
};

const iconMap = {
  activities: CalendarDays,
  impactStats: BarChart3,
  inquiries: Mail,
  newInquiries: MessageSquare,
  media: Images,
  news: Newspaper,
  research: BookOpen,
};

const hrefMap = {
  activities: "/admin/activities",
  impactStats: "/admin/impact-statistics",
  inquiries: "/admin/contact-inquiries",
  newInquiries: "/admin/contact-inquiries",
  media: "/admin/media",
  news: "/admin/news",
  research: "/admin/research",
};

export default function StatCard({ label, value, type, loading }) {
  const Icon = iconMap[type] || CalendarDays;
  const href = hrefMap[type] || "/admin";

  return (
    <Link
      to={href}
      className="group rounded-xl border border-[#E5E7E5] bg-white p-5 transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(0,24,9,0.06)]"
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            toneMap[type] || "bg-mint text-primary-dark"
          }`}
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
