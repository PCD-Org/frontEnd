import { useState } from "react";
import { toast } from "sonner";
import { Plus, BarChart3 } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useImpactStatistics } from "../features/impact-statistics/useImpactStatistics";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Button from "../components/ui/admin/Button";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import Modal from "../components/ui/admin/Modal";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import ImpactStatisticsList from "../features/impact-statistics/ImpactStatisticsList";
import ImpactStatisticForm from "../features/impact-statistics/ImpactStatisticForm";

export default function ImpactStatisticsPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, create, update, remove } = useImpactStatistics();

  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canManage = can("activities.create") || can("activities.update") || true;

  const handleCreate = async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success(t("admin.impactStats.saveSuccess") || "تم حفظ الإحصائية بنجاح.");
      setCreating(false);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleUpdate = async (values) => {
    const id = editingItem?.id || editingItem?._id;
    if (!id) return;
    try {
      await update.mutateAsync({ id, payload: values });
      toast.success(t("admin.impactStats.saveSuccess") || "تم حفظ الإحصائية بنجاح.");
      setEditingItem(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleDelete = async () => {
    const id = deleteTarget?.id || deleteTarget?._id;
    if (!id) return;
    try {
      await remove.mutateAsync(id);
      toast.success(t("admin.impactStats.deleteSuccess") || "تم حذف الإحصائية.");
      setDeleteTarget(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.impactStats") || "إحصائيات الأثر"}
        subtitle={t("admin.impactStats.subtitle") || "إدارة أرقام وإحصائيات الأثر المعروضة على الموقع"}
        actions={
          canManage && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              {t("admin.impactStats.new") || "إحصائية جديدة"}
            </Button>
          )
        }
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.impactStats.demoNote") || "يتم تخزين الإحصائيات محلياً حتى يتم ربط الـ API."}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : list.data?.length ? (
        <ImpactStatisticsList
          items={list.data}
          search={search}
          onSearchChange={setSearch}
          onEdit={setEditingItem}
          onDelete={setDeleteTarget}
          canEdit={canManage}
          canDelete={canManage}
        />
      ) : (
        <EmptyState
          icon={BarChart3}
          title={t("admin.impactStats.empty") || "لا توجد إحصائيات بعد"}
          hint={t("admin.impactStats.emptyHint") || "أضف أول إحصائية أثر للبدء."}
          action={
            canManage && (
              <Button size="sm" icon={Plus} onClick={() => setCreating(true)}>
                {t("admin.impactStats.new") || "إحصائية جديدة"}
              </Button>
            )
          }
        />
      )}

      {/* Create Modal */}
      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={t("admin.impactStats.createTitle") || "إضافة إحصائية جديدة"}
        size="md"
        closeLabel={t("common.cancel")}
      >
        <ImpactStatisticForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitting={create.isPending}
          submitLabel={t("common.save")}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        title={t("admin.impactStats.editTitle") || "تعديل الإحصائية"}
        size="md"
        closeLabel={t("common.cancel")}
      >
        {editingItem && (
          <ImpactStatisticForm
            initialValues={editingItem}
            onSubmit={handleUpdate}
            onCancel={() => setEditingItem(null)}
            submitting={update.isPending}
            submitLabel={t("common.save")}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={t("admin.impactStats.deleteTitle") || "حذف الإحصائية"}
        description={t("admin.impactStats.deleteConfirm") || "هل أنت متأكد من حذف هذه الإحصائية؟ لا يمكن التراجع عن هذا الإجراء."}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        loading={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
