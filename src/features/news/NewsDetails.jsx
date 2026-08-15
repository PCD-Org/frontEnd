import { useTranslation } from "../../utils/useTranslation";
import Modal from "../../components/ui/admin/Modal";
import Badge from "../../components/ui/admin/Badge";
import { categoryLabelKey } from "./categories";

function Row({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#EDF0ED] py-2 text-sm last:border-0">
      <dt className="shrink-0 text-[#6B7280]">{label}</dt>
      <dd className="text-end font-medium text-[#001809]">{value}</dd>
    </div>
  );
}

export default function NewsDetails({ item, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title={t("admin.news.detailsTitle")}
      size="lg"
      closeLabel={t("common.close")}
    >
      {item && (
        <div className="flex flex-col gap-5">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#001809]">
              {item.titleAr}
            </h3>
            <p className="mt-1 text-sm text-[#424842]">{item.titleEn}</p>
          </div>

          <p className="text-sm leading-relaxed text-[#424842]">{item.summary}</p>
          {item.content && (
            <p className="text-sm leading-relaxed text-[#6B7280]">{item.content}</p>
          )}

          <dl>
            <Row
              label={t("admin.common.category")}
              value={
                categoryLabelKey(item.category)
                  ? t(categoryLabelKey(item.category))
                  : item.category
              }
            />
            <Row label={t("admin.common.author")} value={item.author} />
            <Row label={t("admin.common.date")} value={item.date} />
            <Row
              label={t("admin.common.status")}
              value={
                item.published ? (
                  <Badge tone="success">{t("admin.common.published")}</Badge>
                ) : (
                  <Badge tone="muted">{t("admin.common.draft")}</Badge>
                )
              }
            />
          </dl>
        </div>
      )}
    </Modal>
  );
}
