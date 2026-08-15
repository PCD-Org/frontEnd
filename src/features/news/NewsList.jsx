import { useTranslation } from "../../utils/useTranslation";
import Badge from "../../components/ui/admin/Badge";
import IconButton from "../../components/ui/admin/IconButton";
import EmptyState from "../../components/ui/admin/EmptyState";
import { Search, Eye, Pencil, Trash2, Newspaper } from "lucide-react";
import { categoryLabelKey } from "./categories";

export default function NewsList({
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
  const filtered = items.filter((item) =>
    `${item.titleAr} ${item.titleEn}`.toLowerCase().includes(query)
  );

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
          placeholder={t("admin.news.search")}
          aria-label={t("admin.news.search")}
          className="h-10 w-full rounded-lg border border-[#D7DDD7] bg-white ps-9 pe-3 text-sm text-[#001809] outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Newspaper}
          title={t("admin.news.empty")}
          hint={t("admin.news.emptyHint")}
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#E5E7E5] bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-surface text-xs uppercase tracking-wide text-[#6B7280]">
              <tr>
                <th scope="col" className="px-4 py-3 text-start font-semibold">
                  {t("admin.common.titleAr")}
                </th>
                <th scope="col" className="px-4 py-3 text-start font-semibold">
                  {t("admin.common.category")}
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
              {filtered.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-surface/60">
                  <td className="px-4 py-3 font-medium text-[#001809]">
                    {language === "ar" ? item.titleAr : item.titleEn}
                  </td>
                  <td className="px-4 py-3 text-[#424842]">
                    {categoryLabelKey(item.category)
                      ? t(categoryLabelKey(item.category))
                      : item.category}
                  </td>
                  <td className="px-4 py-3">
                    {item.published ? (
                      <Badge tone="success">{t("admin.common.published")}</Badge>
                    ) : (
                      <Badge tone="muted">{t("admin.common.draft")}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#424842]">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <IconButton title={t("admin.news.view")} onClick={() => onView(item)}>
                        <Eye size={16} />
                      </IconButton>
                      {canEdit && (
                        <IconButton title={t("admin.news.edit")} onClick={() => onEdit(item)}>
                          <Pencil size={16} />
                        </IconButton>
                      )}
                      {canDelete && (
                        <IconButton
                          title={t("admin.news.delete")}
                          danger
                          onClick={() => onDelete(item)}
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
