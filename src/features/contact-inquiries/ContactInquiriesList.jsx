import { useTranslation } from "../../utils/useTranslation";
import Badge from "../../components/ui/admin/Badge";
import IconButton from "../../components/ui/admin/IconButton";
import EmptyState from "../../components/ui/admin/EmptyState";
import { Search, Eye, MessageSquare } from "lucide-react";

const toneMap = {
  new: "warning",
  read: "info",
  replied: "success",
};

export default function ContactInquiriesList({
  items = [],
  search = "",
  onSearchChange,
  statusFilter = "all",
  onStatusFilterChange,
  onView,
}) {
  const { t, language } = useTranslation();
  const query = (search || "").toLowerCase().trim();

  const filtered = items.filter((item) => {
    // Status tab filter
    if (statusFilter !== "all" && item.status !== statusFilter) {
      return false;
    }
    // Search query filter
    if (query) {
      const name = (item.name || "").toLowerCase();
      const email = (item.email || "").toLowerCase();
      const message = (item.message || "").toLowerCase();
      return name.includes(query) || email.includes(query) || message.includes(query);
    }
    return true;
  });

  const filterTabs = [
    { key: "all", label: t("admin.inquiries.filterAll") || "الكل" },
    { key: "new", label: t("admin.inquiries.statusNew") || "جديد" },
    { key: "read", label: t("admin.inquiries.statusRead") || "مقروء" },
    { key: "replied", label: t("admin.inquiries.statusReplied") || "تم الرد" },
  ];

  return (
    <div>
      {/* Controls: Search and Status Filter */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm w-full">
          <Search
            size={16}
            className="absolute start-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("admin.inquiries.search") || "ابحث في الرسائل..."}
            aria-label={t("admin.inquiries.search") || "ابحث في الرسائل..."}
            className="h-10 w-full rounded-lg border border-[#D7DDD7] bg-white ps-9 pe-3 text-sm text-[#001809] outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#E5E7E5] bg-white p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onStatusFilterChange(tab.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === tab.key
                  ? "bg-mint text-primary-dark shadow-xs"
                  : "text-[#6B7280] hover:text-[#001809]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title={t("admin.inquiries.empty") || "لا توجد رسائل"}
          hint={t("admin.inquiries.emptyHint") || "لم يتم استلام أي استفسارات أو رسائل تطابق بحثك."}
        />
      ) : (
        <>
          {/* Desktop & Tablet Table */}
          <div className="hidden overflow-x-auto rounded-xl border border-[#E5E7E5] bg-white sm:block">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-[#6B7280]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.inquiries.sender") || "المرسل"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.inquiries.message") || "الرسالة"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.common.status")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.common.date")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-end font-semibold">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF0ED]">
                {filtered.map((item) => {
                  const formattedDate = item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString(
                        language === "ar" ? "ar-EG" : "en-US",
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : "-";

                  const statusLabel =
                    item.status === "new"
                      ? t("admin.inquiries.statusNew") || "جديد"
                      : item.status === "read"
                      ? t("admin.inquiries.statusRead") || "مقروء"
                      : item.status === "replied"
                      ? t("admin.inquiries.statusReplied") || "تم الرد"
                      : item.status;

                  return (
                    <tr
                      key={item.id || item._id}
                      className={`transition-colors hover:bg-surface/60 ${
                        item.status === "new" ? "bg-[#FAFBF9] font-medium" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#001809]">{item.name}</p>
                        <p className="text-xs text-[#6B7280]" dir="ltr">{item.email}</p>
                      </td>
                      <td className="px-4 py-3 max-w-xs">
                        <p className="truncate text-xs text-[#424842]">
                          {item.message}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={toneMap[item.status] || "muted"}>
                          {statusLabel}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-[#6B7280]">
                        {formattedDate}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <IconButton
                            title={t("admin.news.view") || "عرض التفاصيل"}
                            onClick={() => onView(item)}
                          >
                            <Eye size={16} />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {filtered.map((item) => {
              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString(
                    language === "ar" ? "ar-EG" : "en-US",
                    { month: "short", day: "numeric" }
                  )
                : "-";

              const statusLabel =
                item.status === "new"
                  ? t("admin.inquiries.statusNew") || "جديد"
                  : item.status === "read"
                  ? t("admin.inquiries.statusRead") || "مقروء"
                  : item.status === "replied"
                  ? t("admin.inquiries.statusReplied") || "تم الرد"
                  : item.status;

              return (
                <div
                  key={item.id || item._id}
                  onClick={() => onView(item)}
                  className={`cursor-pointer rounded-xl border border-[#E5E7E5] p-4 shadow-xs transition-colors hover:border-primary ${
                    item.status === "new" ? "bg-[#FAFBF9]" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-[#001809]">{item.name}</p>
                      <p className="text-xs text-[#6B7280]" dir="ltr">{item.email}</p>
                    </div>
                    <Badge tone={toneMap[item.status] || "muted"}>{statusLabel}</Badge>
                  </div>

                  <p className="mt-2 text-xs text-[#424842] line-clamp-2">
                    {item.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#EDF0ED] pt-2 text-[11px] text-[#8B918B]">
                    <span>{formattedDate}</span>
                    <span className="font-semibold text-[#006c48]">
                      {t("admin.news.view") || "عرض التفاصيل"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
