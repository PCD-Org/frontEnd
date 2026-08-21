import { useTranslation } from "../../utils/useTranslation";
import IconButton from "../../components/ui/admin/IconButton";
import EmptyState from "../../components/ui/admin/EmptyState";
import { Search, Pencil, Trash2, BarChart3 } from "lucide-react";

export default function ImpactStatisticsList({
  items,
  search,
  onSearchChange,
  onEdit,
  onDelete,
  canEdit = true,
  canDelete = true,
}) {
  const { t, language } = useTranslation();
  const query = (search || "").toLowerCase().trim();

  const filtered = (items || []).filter((item) => {
    const ar = item.labelAr || (typeof item.label === "object" ? item.label?.ar : item.label) || "";
    const en = item.labelEn || (typeof item.label === "object" ? item.label?.en : "") || "";
    const val = String(item.value || "");
    return `${ar} ${en} ${val}`.toLowerCase().includes(query);
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
          placeholder={t("admin.impactStats.search") || "ابحث في الإحصائيات..."}
          aria-label={t("admin.impactStats.search") || "ابحث في الإحصائيات..."}
          className="h-10 w-full rounded-lg border border-[#D7DDD7] bg-white ps-9 pe-3 text-sm text-[#001809] outline-none transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title={t("admin.impactStats.empty") || "لا توجد إحصائيات بعد"}
          hint={t("admin.impactStats.emptyHint") || "أضف أول إحصائية أثر للموقع."}
        />
      ) : (
        <>
          {/* Desktop & Tablet Table */}
          <div className="hidden overflow-x-auto rounded-xl border border-[#E5E7E5] bg-white sm:block">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-surface text-xs uppercase tracking-wide text-[#6B7280]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.impactStats.labelAr") || "التسمية (عربي)"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.impactStats.labelEn") || "Label (English)"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-start font-semibold">
                    {t("admin.impactStats.value") || "القيمة"}
                  </th>
                  <th scope="col" className="px-4 py-3 text-end font-semibold">
                    {t("common.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDF0ED]">
                {filtered.map((item) => {
                  const ar = item.labelAr || (typeof item.label === "object" ? item.label?.ar : item.label) || "-";
                  const en = item.labelEn || (typeof item.label === "object" ? item.label?.en : "") || "-";
                  const formattedVal = Number(item.value).toLocaleString(language === "ar" ? "ar-EG" : "en-US");

                  return (
                    <tr key={item.id || item._id} className="transition-colors hover:bg-surface/60">
                      <td className="px-4 py-3 font-semibold text-[#001809]">
                        {ar}
                      </td>
                      <td className="px-4 py-3 text-[#424842]" dir="ltr">
                        {en}
                      </td>
                      <td className="px-4 py-3 font-bold text-primary text-base">
                        {formattedVal}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          {canEdit && (
                            <IconButton
                              title={t("admin.activities.edit")}
                              onClick={() => onEdit(item)}
                            >
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

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {filtered.map((item) => {
              const ar = item.labelAr || (typeof item.label === "object" ? item.label?.ar : item.label) || "-";
              const en = item.labelEn || (typeof item.label === "object" ? item.label?.en : "") || "-";
              const formattedVal = Number(item.value).toLocaleString(language === "ar" ? "ar-EG" : "en-US");

              return (
                <div
                  key={item.id || item._id}
                  className="rounded-xl border border-[#E5E7E5] bg-white p-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-base text-[#001809]">{ar}</p>
                      <p className="text-xs text-[#6B7280]" dir="ltr">{en}</p>
                    </div>
                    <span className="rounded-lg bg-mint px-2.5 py-1 text-sm font-bold text-primary-dark">
                      {formattedVal}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-end gap-1 border-t border-[#EDF0ED] pt-2">
                    {canEdit && (
                      <IconButton
                        title={t("admin.activities.edit")}
                        onClick={() => onEdit(item)}
                      >
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
