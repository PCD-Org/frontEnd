import { useTranslation } from "../../utils/useTranslation";
import Badge from "../../components/ui/admin/Badge";
import IconButton from "../../components/ui/admin/IconButton";
import EmptyState from "../../components/ui/admin/EmptyState";
import ActivityImage from "../../components/ui/ActivityImage";
import { Search, Pencil, Trash2, CalendarDays, Eye } from "lucide-react";
import { categoryLabelKey } from "./categories";

export default function ActivitiesList({
  items,
  search,
  onSearchChange,
  onView,
  onEdit,
  onDelete,
  canEdit,
  canDelete,
}) {
  const { t, language } = useTranslation();
  const query = search.toLowerCase().trim();
  const filtered = items.filter((item) => {
    const ar = item.titleAr || (typeof item.title === "object" ? item.title?.ar : item.title) || "";
    const en = item.titleEn || (typeof item.title === "object" ? item.title?.en : "") || "";
    return `${ar} ${en}`.toLowerCase().includes(query);
  });

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search
          size={16}
          className="absolute start-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          aria-hidden="true"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t("admin.activities.search")}
          aria-label={t("admin.activities.search")}
          className="h-10 w-full rounded-lg border border-[#D7DDD7] bg-white ps-9 pe-3 text-sm text-[#001809] outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title={t("admin.activities.empty")}
          hint={t("admin.activities.emptyHint")}
        />
      ) : (
        <>
          {/* Desktop & Tablet Table */}
          <div className="hidden overflow-x-auto rounded-xl border border-[#E5E7E5] bg-white sm:block">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-[#6B7280]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.activities.coverImage") || "الصورة"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.common.titleAr")} / {t("admin.common.titleEn")}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.common.category")}
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
                  const mainTitle =
                    language === "ar"
                      ? item.titleAr || (typeof item.title === "object" ? item.title?.ar : item.title)
                      : item.titleEn || (typeof item.title === "object" ? item.title?.en : item.titleAr || item.title);
                  const subTitle =
                    language === "ar"
                      ? item.titleEn || (typeof item.title === "object" ? item.title?.en : "")
                      : item.titleAr || (typeof item.title === "object" ? item.title?.ar : "");
                  const img = item.coverImage || item.image;

                  return (
                    <tr key={item.id || item._id} className="transition-colors hover:bg-surface/60">
                      <td className="px-4 py-3">
                        <ActivityImage
                          src={img}
                          alt={mainTitle}
                          containerClassName="h-10 w-14 rounded-lg border border-[#E5E7E5] shrink-0"
                          className="h-10 w-14 object-cover"
                          fallbackClassName="h-10 w-14 object-contain p-1"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-[#001809]">{mainTitle}</p>
                        {subTitle && (
                          <p className="text-xs text-[#6B7280]">{subTitle}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone="muted">
                          {categoryLabelKey(item.category)
                            ? t(categoryLabelKey(item.category))
                            : item.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-[#424842]">{item.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {onView && (
                            <IconButton title={t("admin.news.view") || "عرض"} onClick={() => onView(item)}>
                              <Eye size={16} />
                            </IconButton>
                          )}
                          {canEdit && (
                            <IconButton title={t("admin.activities.edit")} onClick={() => onEdit(item)}>
                              <Pencil size={16} />
                            </IconButton>
                          )}
                          {canDelete && (
                            <IconButton
                              title={t("admin.activities.delete")}
                              danger
                              onClick={() => onDelete(item)}
                            >
                              <Trash2 size={16} />
                            </IconButton>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Grid */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {filtered.map((item) => {
              const mainTitle =
                language === "ar"
                  ? item.titleAr || (typeof item.title === "object" ? item.title?.ar : item.title)
                  : item.titleEn || (typeof item.title === "object" ? item.title?.en : item.titleAr || item.title);
              const img = item.coverImage || item.image;

              return (
                <div
                  key={item.id || item._id}
                  className="overflow-hidden rounded-xl border border-[#E5E7E5] bg-white p-4 shadow-xs"
                >
                  <div className="flex items-start gap-3">
                    <ActivityImage
                      src={img}
                      alt={mainTitle}
                      containerClassName="h-16 w-20 shrink-0 rounded-lg border border-[#E5E7E5]"
                      className="h-16 w-20 object-cover"
                      fallbackClassName="h-16 w-20 object-contain p-2"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#001809] line-clamp-2">
                        {mainTitle}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Badge tone="muted">
                          {categoryLabelKey(item.category)
                            ? t(categoryLabelKey(item.category))
                            : item.category}
                        </Badge>
                        <span className="text-xs text-[#6B7280]">{item.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-end gap-1 border-t border-[#EDF0ED] pt-2">
                    {onView && (
                      <IconButton title={t("admin.news.view") || "عرض"} onClick={() => onView(item)}>
                        <Eye size={16} />
                      </IconButton>
                    )}
                    {canEdit && (
                      <IconButton title={t("admin.activities.edit")} onClick={() => onEdit(item)}>
                        <Pencil size={16} />
                      </IconButton>
                    )}
                    {canDelete && (
                      <IconButton
                        title={t("admin.activities.delete")}
                        danger
                        onClick={() => onDelete(item)}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    )}
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
