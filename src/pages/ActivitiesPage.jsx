import { useState } from "react";
import { toast } from "sonner";
import { Plus, CalendarDays, Calendar } from "lucide-react";
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
import Badge from "../components/ui/admin/Badge";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import ActivityImage from "../components/ui/ActivityImage";
import ActivitiesList from "../features/activities/ActivitiesList";
import ActivityForm from "../features/activities/ActivityForm";
import { categoryLabelKey } from "../features/activities/categories";

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, create, update, remove } = useActivities();

  const [search, setSearch] = useState("");
  const [creating, setCreating] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
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
    } catch (err) {
      toast.error(err?.response?.data?.message || t("common.error"));
    }
  };

  const handleUpdate = async (values) => {
    const id = editingItem?.id || editingItem?._id;
    if (!id) return;
    try {
      await update.mutateAsync({ id, payload: values });
      toast.success(t("admin.activities.saveSuccess"));
      setEditingItem(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || t("common.error"));
    }
  };

  const handleDelete = async () => {
    const id = deleteTarget?.id || deleteTarget?._id;
    if (!id) return;
    try {
      await remove.mutateAsync(id);
      toast.success(t("admin.activities.deleteSuccess"));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || t("common.error"));
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
          onView={setViewingItem}
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

      {/* Create Activity Modal */}
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

      {/* Edit Activity Modal */}
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

      {/* View Activity Details Modal */}
      <Modal
        open={Boolean(viewingItem)}
        onClose={() => setViewingItem(null)}
        title={t("admin.news.detailsTitle") || "تفاصيل النشاط"}
        size="lg"
        closeLabel={t("common.close")}
      >
        {viewingItem && (
          <div className="flex flex-col gap-5">
            <ActivityImage
              src={viewingItem.coverImage || viewingItem.image}
              alt={viewingItem.titleAr || (typeof viewingItem.title === "object" ? viewingItem.title?.ar : viewingItem.title) || ""}
              containerClassName="overflow-hidden rounded-xl bg-surface border border-[#E5E7E5] max-h-72 h-56 w-full flex items-center justify-center"
              className="w-full h-full object-cover"
              fallbackClassName="h-full w-full object-contain p-6"
            />

            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="muted">
                {categoryLabelKey(viewingItem.category)
                  ? t(categoryLabelKey(viewingItem.category))
                  : viewingItem.category}
              </Badge>
              {viewingItem.date && (
                <span className="flex items-center gap-1.5 text-xs text-[#6B7280]">
                  <Calendar size={14} />
                  {viewingItem.date}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="rounded-lg bg-surface/80 p-3.5 border border-[#EDF0ED]">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  {t("admin.common.titleAr")}
                </p>
                <h3 className="mt-1 text-base font-bold text-[#001809]">
                  {viewingItem.titleAr || (typeof viewingItem.title === "object" ? viewingItem.title?.ar : viewingItem.title) || "-"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#424842]">
                  {viewingItem.descriptionAr || (typeof viewingItem.description === "object" ? viewingItem.description?.ar : viewingItem.description) || viewingItem.summary || "-"}
                </p>
              </div>

              <div className="rounded-lg bg-surface/80 p-3.5 border border-[#EDF0ED]" dir="ltr">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  {t("admin.common.titleEn")}
                </p>
                <h3 className="mt-1 text-base font-bold text-[#001809]">
                  {viewingItem.titleEn || (typeof viewingItem.title === "object" ? viewingItem.title?.en : "") || "-"}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#424842]">
                  {viewingItem.descriptionEn || (typeof viewingItem.description === "object" ? viewingItem.description?.en : "") || "-"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-[#EDF0ED] pt-4">
              {canEdit && (
                <Button
                  size="sm"
                  onClick={() => {
                    const item = viewingItem;
                    setViewingItem(null);
                    setEditingItem(item);
                  }}
                >
                  {t("admin.activities.edit")}
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setViewingItem(null)}
              >
                {t("common.close")}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
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
