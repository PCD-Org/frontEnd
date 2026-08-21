import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "../utils/useTranslation";
import { useContactInquiries } from "../features/contact-inquiries/useContactInquiries";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Spinner from "../components/ui/admin/Spinner";
import ErrorState from "../components/ui/admin/ErrorState";
import ContactInquiriesList from "../features/contact-inquiries/ContactInquiriesList";
import InquiryDetailsModal from "../features/contact-inquiries/InquiryDetailsModal";

export default function ContactInquiriesPage() {
  const { t } = useTranslation();
  const { list, updateStatus } = useContactInquiries();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(t("admin.inquiries.statusUpdated") || "تم تحديث حالة الرسالة بنجاح.");
      // Update selected inquiry status in modal
      if (selectedInquiry && (selectedInquiry.id === id || selectedInquiry._id === id)) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
      }
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.inquiries") || "رسائل واستفسارات التواصل"}
        subtitle={t("admin.inquiries.subtitle") || "متابعة رسائل واستفسارات الزوار والرد عليها"}
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.inquiries.demoNote") || "يتم تخزين الرسائل محلياً حتى يتم ربط الـ API."}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : (
        <ContactInquiriesList
          items={list.data || []}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onView={(inquiry) => setSelectedInquiry(inquiry)}
        />
      )}

      <InquiryDetailsModal
        inquiry={selectedInquiry}
        open={Boolean(selectedInquiry)}
        onClose={() => setSelectedInquiry(null)}
        onStatusChange={handleStatusChange}
        updating={updateStatus.isPending}
      />
    </div>
  );
}
