import { useTranslation } from "../../utils/useTranslation";
import { formatBytes } from "../../utils/mock";
import Modal from "../../components/ui/admin/Modal";

function MetaRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#EDF0ED] py-2 text-sm last:border-0">
      <dt className="text-[#6B7280]">{label}</dt>
      <dd className="font-medium text-[#001809]">{value}</dd>
    </div>
  );
}

export default function MediaPreview({ item, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title={t("admin.media.previewTitle")}
      size="lg"
      closeLabel={t("common.close")}
    >
      {item && (
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-surface-card">
            {item.type?.startsWith("image/") ? (
              <img
                src={item.url}
                alt={item.filename}
                className="max-h-80 w-full object-contain"
              />
            ) : (
              <span className="py-16 text-sm text-[#6B7280]">
                {item.type || t("admin.media.unknown")}
              </span>
            )}
          </div>
          <dl className="w-full sm:w-56 shrink-0">
            <MetaRow label={t("admin.media.filename")} value={item.filename} />
            <MetaRow
              label={t("admin.media.type")}
              value={item.type || t("admin.media.unknown")}
            />
            <MetaRow
              label={t("admin.media.size")}
              value={formatBytes(item.size) ?? t("admin.media.unknown")}
            />
            <MetaRow
              label={t("admin.media.dimensions")}
              value={
                item.width != null
                  ? `${item.width} × ${item.height}`
                  : t("admin.media.unknown")
              }
            />
            <MetaRow
              label={t("admin.media.uploadedAt")}
              value={new Date(item.uploadedAt).toLocaleDateString()}
            />
          </dl>
        </div>
      )}
    </Modal>
  );
}
