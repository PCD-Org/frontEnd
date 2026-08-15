import { useTranslation } from "../../utils/useTranslation";
import Modal from "../../components/ui/admin/Modal";
import NewsForm from "./NewsForm";

export default function NewsEditor({ item, onSave, onClose, submitting }) {
  const { t } = useTranslation();

  return (
    <Modal
      open={Boolean(item)}
      onClose={onClose}
      title={t("admin.news.editTitle")}
      size="lg"
      closeLabel={t("common.cancel")}
    >
      {item && (
        <NewsForm
          initialValues={item}
          onSubmit={onSave}
          onCancel={onClose}
          submitting={submitting}
          submitLabel={t("common.save")}
        />
      )}
    </Modal>
  );
}
