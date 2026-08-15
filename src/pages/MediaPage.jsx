import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Images as ImagesIcon } from "lucide-react";
import { useTranslation } from "../utils/useTranslation";
import { useAuth } from "../features/auth/useAuth";
import { useMedia } from "../features/media/useMedia";
import { API_MODE } from "../utils/api";
import AdminPageHeader from "../components/ui/admin/AdminPageHeader";
import Button from "../components/ui/admin/Button";
import Spinner from "../components/ui/admin/Spinner";
import EmptyState from "../components/ui/admin/EmptyState";
import ErrorState from "../components/ui/admin/ErrorState";
import ConfirmDialog from "../components/ui/admin/ConfirmDialog";
import MediaGrid from "../features/media/MediaGrid";
import MediaPreview from "../features/media/MediaPreview";

const MAX_SIZE = 5 * 1024 * 1024;

export default function MediaPage() {
  const { t } = useTranslation();
  const { can } = useAuth();
  const { list, upload, remove } = useMedia();

  const fileRef = useRef(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const canCreate = can("media.create");
  const canDelete = can("media.delete");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError(null);

    const isImage =
      file.type.startsWith("image/") ||
      /\.(png|jpe?g|webp|gif|svg)$/i.test(file.name);
    if (!isImage) {
      setUploadError(t("admin.media.invalidType"));
      return;
    }
    if (file.size > MAX_SIZE) {
      setUploadError(t("admin.media.tooLarge"));
      return;
    }

    try {
      await upload.mutateAsync(file);
      toast.success(t("admin.media.uploadSuccess"));
    } catch {
      toast.error(t("common.error"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove.mutateAsync(deleteTarget.id);
      toast.success(t("admin.media.deleteSuccess"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("common.error"));
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={t("admin.nav.media")}
        subtitle={t("admin.media.subtitle")}
        actions={
          canCreate && (
            <Button
              icon={Upload}
              loading={upload.isPending}
              disabled={upload.isPending}
              onClick={() => fileRef.current?.click()}
            >
              {upload.isPending
                ? t("admin.media.uploading")
                : t("admin.media.upload")}
            </Button>
          )
        }
      />

      {API_MODE === "mock" && (
        <p className="mb-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {t("admin.media.demoNote")}
        </p>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {uploadError && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {uploadError}
        </p>
      )}

      {list.isError ? (
        <ErrorState message={t("admin.media.error")} onRetry={() => list.refetch()} />
      ) : list.isLoading ? (
        <div className="flex justify-center py-16">
          <Spinner label={t("common.loading")} />
        </div>
      ) : list.data?.length ? (
        <MediaGrid
          items={list.data}
          canDelete={canDelete}
          onPreview={setPreviewItem}
          onDelete={setDeleteTarget}
        />
      ) : (
        <EmptyState
          icon={ImagesIcon}
          title={t("admin.media.empty")}
          hint={t("admin.media.emptyHint")}
          action={
            canCreate && (
              <Button size="sm" icon={Upload} onClick={() => fileRef.current?.click()}>
                {t("admin.media.upload")}
              </Button>
            )
          }
        />
      )}

      <MediaPreview
        item={previewItem}
        onClose={() => setPreviewItem(null)}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title={t("admin.media.deleteTitle")}
        description={t("admin.media.deleteConfirm").replace(
          "{name}",
          deleteTarget?.filename ?? ""
        )}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        loading={remove.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
