import { FileImage, Trash2 } from "lucide-react";
import { useTranslation } from "../../utils/useTranslation";
import { formatBytes } from "../../utils/mock";
import IconButton from "../../components/ui/admin/IconButton";
import Badge from "../../components/ui/admin/Badge";

export default function MediaGrid({ items, onPreview, onDelete, canDelete }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative overflow-hidden rounded-xl border border-[#E5E7E5] bg-white transition-shadow hover:shadow-[0_8px_24px_rgba(0,24,9,0.08)]"
        >
          <button
            type="button"
            onClick={() => onPreview(item)}
            className="flex h-36 w-full items-center justify-center overflow-hidden bg-surface-card outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
            aria-label={`${t("admin.media.preview")} ${item.filename}`}
          >
            {item.type?.startsWith("image/") ? (
              <img
                src={item.url}
                alt={item.filename}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <FileImage size={28} className="text-[#9CA3AF]" aria-hidden="true" />
            )}
          </button>

          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="min-w-0">
              <p
                className="truncate text-xs font-semibold text-[#001809]"
                title={item.filename}
              >
                {item.filename}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                <Badge tone="muted">
                  {item.type || t("admin.media.unknown")}
                </Badge>
                {item.size != null && <span>{formatBytes(item.size)}</span>}
                {item.width != null && (
                  <span>
                    {item.width}×{item.height}
                  </span>
                )}
              </div>
            </div>
            {canDelete && (
              <IconButton
                title={t("admin.media.delete")}
                danger
                onClick={() => onDelete(item)}
              >
                <Trash2 size={16} />
              </IconButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
