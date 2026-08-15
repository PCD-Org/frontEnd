import { useState } from "react";
import { toast } from "sonner";
import { Plus, Newspaper } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useNews } from "../features/news/useNews";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Button from "../components/ui/admin/Button";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import Modal from "../components/ui/admin/Modal";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import NewsList from "../features/news/NewsList";
import NewsForm from "../features/news/NewsForm";
import NewsEditor from "../features/news/NewsEditor";
import NewsDetails from "../features/news/NewsDetails";

export default function NewsPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, create, update, remove } = useNews();

  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const canCreate = can("news.create");
  const canEdit = can("news.update");
  const canDelete = can("news.delete");

  const handleCreate = async (values) => {
    try {
      await create.mutateAsync(values);
      toast.success(t("admin.news.saveSuccess"));
      setCreating(false);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleUpdate = async (values) => {
    if (!editingItem) return;
    try {
      await update.mutateAsync({ id: editingItem.id, payload: values });
      toast.success(t("admin.news.saveSuccess"));
      setEditingItem(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      toast.success(t("admin.news.deleteSuccess"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.news")}
        subtitle={t("admin.news.subtitle")}
        actions={
          canCreate && (
            <Button icon={Plus} onClick={() => setCreating(true)}>
              {t("admin.news.new")}
            </Button>
          )
        }
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.news.demoNote")}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("common.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : list.data?.length ? (
        <NewsList
          items={list.data}
          search={search}
          onSearchChange={setSearch}
          onView={setViewingItem}
          onEdit={setEditingItem}
          onDelete={setDeleteTarget}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      ) : (
        <EmptyState
          icon={Newspaper}
          title={t("admin.news.empty")}
          hint={t("admin.news.emptyHint")}
          action={
            canCreate && (
              <Button size="sm" icon={Plus} onClick={() => setCreating(true)}>
                {t("admin.news.new")}
              </Button>
            )
          }
        />
      )}

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={t("admin.news.createTitle")}
        size="lg"
        closeLabel={t("common.cancel")}
      >
        <NewsForm
          onSubmit={handleCreate}
          onCancel={() => setCreating(false)}
          submitting={create.isPending}
          submitLabel={t("common.save")}
        />
      </Modal>

      <NewsEditor
        item={editingItem}
        onSave={handleUpdate}
        onClose={() => setEditingItem(null)}
        submitting={update.isPending}
      />

      <NewsDetails item={viewingItem} onClose={() => setViewingItem(null)} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={t("admin.news.deleteTitle")}
        description={t("admin.news.deleteConfirm")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        loading={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
