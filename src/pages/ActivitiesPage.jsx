import { useState } from "react";
import { toast } from "sonner";
import { Plus, CalendarDays } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useActivities } from "../features/activities/useActivities";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Button from "../components/ui/admin/Button";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import Modal from "../components/ui/admin/Modal";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import ActivitiesList from "../features/activities/ActivitiesList";
import ActivityForm from "../features/activities/ActivityForm";

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, create, update, remove } = useActivities();

  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canCreate = can("activities.create");
  const canEdit = can("activities.update");
  const canDelete = can("activities.delete");

  const handleCreate = async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success(t("admin.activities.saveSuccess"));
      setCreating(false);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleUpdate = async (values) => {
    if (!editingItem) return;
    try {
      await update.mutateAsync({ id: editingItem.id, payload: values });
      toast.success(t("admin.activities.saveSuccess"));
      setEditingItem(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      toast.success(t("admin.activities.deleteSuccess"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.activities")}
        subtitle={t("admin.activities.subtitle")}
        actions={
          canCreate && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              {t("admin.activities.new")}
            </Button>
          )
        }
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.activities.demoNote")}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : list.data?.length ? (
        <ActivitiesList
          items={list.data}
          search={search}
          onSearchChange={setSearch}
          onEdit={setEditingItem}
          onDelete={setDeleteTarget}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ) : (
        <EmptyState
          icon={CalendarDays}
          title={t("admin.activities.empty")}
          hint={t("admin.activities.emptyHint")}
          action={
            canCreate && (
              <Button size="sm" icon={Plus} onClick={() => setCreating(true)}>
                {t("admin.activities.new")}
              </Button>
            )
          }
        />
      )}

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={t("admin.activities.createTitle")}
        size="lg"
        closeLabel={t("common.cancel")}
      >
        <ActivityForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitting={create.isPending}
          submitLabel={t("common.save")}
        />
      </Modal>

      <Modal
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        title={t("admin.activities.editTitle")}
        size="lg"
        closeLabel={t("common.cancel")}
      >
        {editingItem && (
          <ActivityForm
            initialValues={editingItem}
            onSubmit={handleUpdate}
            onCancel={() => setEditingItem(null)}
            submitting={update.isPending}
            submitLabel={t("common.save")}
          />
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={t("admin.activities.deleteTitle")}
        description={t("admin.activities.deleteConfirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        loading={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
