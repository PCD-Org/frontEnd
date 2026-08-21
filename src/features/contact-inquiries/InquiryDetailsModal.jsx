import { useTranslation } from "../../utils/useTranslation";
import Modal from "../../components/ui/admin/Modal";
import Badge from "../../components/ui/admin/Badge";
import Button from "../../components/ui/admin/Button";
import { Mail, Calendar, CheckCircle, Reply, RotateCcw } from "lucide-react";

const toneMap = {
  new: "warning",
  read: "info",
  replied: "success",
};

export default function InquiryDetailsModal({
  inquiry,
  open,
  onClose,
  onStatusChange,
  updating = false,
}) {
  const { t, language } = useTranslation();

  if (!inquiry) return null;

  const formattedDate = inquiry.createdAt
    ? new Date(inquiry.createdAt).toLocaleDateString(language === "ar" ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

  const statusLabel =
    inquiry.status === "new"
      ? t("admin.inquiries.statusNew") || "جديد"
      : inquiry.status === "read"
      ? t("admin.inquiries.statusRead") || "تمت القراءة"
      : inquiry.status === "replied"
      ? t("admin.inquiries.statusReplied") || "تم الرد"
      : inquiry.status;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t("admin.inquiries.detailsTitle") || "تفاصيل الرسالة"}
      size="lg"
      closeLabel={t("common.close")}
    >
      <div className="flex flex-col gap-5">
        {/* Header summary info */}
        <div className="rounded-xl border border-[#E5E7E5] bg-[#FAF9F8] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-primary font-bold">
                {(inquiry.name || "U").charAt(0)}
              </span>
              <div>
                <h3 className="font-bold text-base text-[#001809]">{inquiry.name}</h3>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex items-center gap-1.5 text-xs text-[#006c48] hover:underline"
                  dir="ltr"
                >
                  <Mail size={13} />
                  {inquiry.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge tone={toneMap[inquiry.status] || "muted"}>{statusLabel}</Badge>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-[#6B7280]">
            <Calendar size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Message body */}
        <div className="rounded-xl border border-[#E5E7E5] bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
            {t("admin.inquiries.message") || "نص الرسالة"}
          </p>
          <p className="text-sm leading-relaxed text-[#001809] whitespace-pre-wrap">
            {inquiry.message}
          </p>
        </div>

        {/* Status change actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#EDF0ED] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#6B7280]">
              {t("admin.inquiries.changeStatus") || "تغيير الحالة:"}
            </span>

            {inquiry.status !== "read" && (
              <Button
                variant="secondary"
                size="sm"
                icon={CheckCircle}
                loading={updating}
                disabled={updating}
                onClick={() => onStatusChange(inquiry.id || inquiry._id, "read")}
              >
                {t("admin.inquiries.markRead") || "تحديد كمقروء"}
              </Button>
            )}

            {inquiry.status !== "replied" && (
              <Button
                variant="primary"
                size="sm"
                icon={Reply}
                loading={updating}
                disabled={updating}
                onClick={() => onStatusChange(inquiry.id || inquiry._id, "replied")}
              >
                {t("admin.inquiries.markReplied") || "تحديد كتم الرد"}
              </Button>
            )}

            {inquiry.status !== "new" && (
              <Button
                variant="ghost"
                size="sm"
                icon={RotateCcw}
                loading={updating}
                disabled={updating}
                onClick={() => onStatusChange(inquiry.id || inquiry._id, "new")}
              >
                {t("admin.inquiries.markNew") || "تحديد كجديد"}
              </Button>
            )}
          </div>

          <Button variant="secondary" size="sm" onClick={onClose}>
            {t("common.close")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
