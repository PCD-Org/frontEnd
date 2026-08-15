import { useState } from "react";
import { toast } from "sonner";
import { Plus, BookOpen } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useResearch } from "../features/research/useResearch";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Button from "../components/ui/admin/Button";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import Modal from "../components/ui/admin/Modal";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import ResearchList from "../features/research/ResearchList";
import ResearchForm from "../features/research/ResearchForm";

export default function ResearchPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, create, update, remove } = useResearch();

  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canCreate = can("research.create");
  const canEdit = can("research.update");
  const canDelete = can("research.delete");

  const handleCreate = async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success(t("admin.research.saveSuccess"));
      setCreating(false);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleUpdate = async (values) => {
    if (!editingItem) return;
    try {
      await update.mutateAsync({ id: editingItem.id, payload: values });
      toast.success(t("admin.research.saveSuccess"));
      setEditingItem(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      toast.success(t("admin.research.deleteSuccess"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.research")}
        subtitle={t("admin.research.subtitle")}
        actions={
          canCreate && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              {t("admin.research.new")}
            </Button>
          )
        }
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.research.demoNote")}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : list.data?.length ? (
        <ResearchList
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
          icon={BookOpen}
          title={t("admin.research.empty")}
          hint={t("admin.research.emptyHint")}
          action={
            canCreate && (
              <Button size="sm" icon={Plus} onClick={() => setCreating(true)}>
                {t("admin.research.new")}
              </Button>
            )
          }
        />
      )}

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={t("admin.research.createTitle")}
        size="lg"
        closeLabel={t("common.cancel")}
      >
        <ResearchForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitting={create.isPending}
          submitLabel={t("common.save")}
        />
      </Modal>

      <Modal
        open={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        title={t("admin.research.editTitle")}
        size="lg"
        closeLabel={t("common.cancel")}
      >
        {editingItem && (
          <ResearchForm
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
        title={t("admin.research.deleteTitle")}
        description={t("admin.research.deleteConfirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        loading={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
