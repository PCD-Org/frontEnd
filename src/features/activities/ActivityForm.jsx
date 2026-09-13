import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../utils/useTranslation";
import Field from "../../components/ui/admin/Field";
import Button from "../../components/ui/admin/Button";
import { activityCategories } from "./categories";
import {
  UploadCloud,
  Trash2,
  GripVertical,
  Star,
  ChevronLeft,
  ChevronRight,
  Info,
  Plus,
} from "lucide-react";

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const emptyValues = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  category: "development",
  date: new Date().toISOString().slice(0, 10),
};

function LabeledSelect({ id, label, value, onChange, options, error, disabled }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-1.5 text-start">
      <label htmlFor={id} className="text-sm font-semibold text-[#001809]">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 disabled:opacity-60 disabled:bg-gray-50 ${
          error
            ? "border-red-500 focus-visible:ring-red-500/30"
            : "border-[#D7DDD7] focus-visible:border-primary focus-visible:ring-primary/40"
        }`}
      >
        <option value="">{t("admin.common.selectCategory")}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.labelKey)}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ActivityForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel,
}) {
  const { t, dir } = useTranslation();
  const fileInputRef = useRef(null);
  const objectUrlsRef = useRef(new Set());
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [values, setValues] = useState(() => {
    const titleAr =
      initialValues?.titleAr ||
      (typeof initialValues?.title === "object" ? initialValues?.title?.ar : initialValues?.title) ||
      "";
    const titleEn =
      initialValues?.titleEn ||
      (typeof initialValues?.title === "object" ? initialValues?.title?.en : "") ||
      "";
    const descAr =
      initialValues?.descriptionAr ||
      (typeof initialValues?.description === "object" ? initialValues?.description?.ar : initialValues?.description) ||
      initialValues?.summary ||
      "";
    const descEn =
      initialValues?.descriptionEn ||
      (typeof initialValues?.description === "object" ? initialValues?.description?.en : "") ||
      "";
    const categoryKey =
      typeof initialValues?.category === "object"
        ? initialValues?.category?.key
        : initialValues?.category;
    const normalizedCat = categoryKey === "psycho" ? "psychosocial" : categoryKey || "development";

    return {
      titleAr,
      titleEn,
      descriptionAr: descAr,
      descriptionEn: descEn,
      category: normalizedCat,
      date: initialValues?.date
        ? typeof initialValues.date === "string"
          ? initialValues.date.split("T")[0]
          : initialValues.date
        : emptyValues.date,
    };
  });

  // Manage all images in an ordered array
  const [imageItems, setImageItems] = useState(() => {
    const existing =
      Array.isArray(initialValues?.images) && initialValues.images.length > 0
        ? initialValues.images
        : [initialValues?.coverImage || initialValues?.image].filter(Boolean);

    return existing.map((url, idx) => ({
      id: `existing-${idx}-${typeof url === "string" ? url.slice(-12) : idx}`,
      type: "existing",
      previewUrl: typeof url === "object" && url !== null ? url.url : url,
      name: `Image ${idx + 1}`,
      size: null,
    }));
  });

  const [errors, setErrors] = useState({});

  // Cleanup object URLs on unmount
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
      urls.clear();
    };
  }, []);

  const set = (field) => (event) =>
    setValues((v) => ({ ...v, [field]: event.target.value }));

  // Handle adding new files
  const handleFilesSelected = (files) => {
    if (!files || files.length === 0) return;

    const currentCount = imageItems.length;
    const availableSlots = MAX_IMAGES - currentCount;

    if (availableSlots <= 0) {
      setErrors((err) => ({
        ...err,
        images: t("admin.activities.maxImagesReached") || `الحد الأقصى المسموح به هو ${MAX_IMAGES} صور`,
      }));
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);
    const addedItems = [];
    let hasInvalidType = false;
    let hasTooLarge = false;

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        hasInvalidType = true;
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        hasTooLarge = true;
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      objectUrlsRef.current.add(previewUrl);
      addedItems.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        type: "file",
        file,
        previewUrl,
        name: file.name,
        size: file.size,
      });
    });

    if (hasInvalidType) {
      setErrors((err) => ({
        ...err,
        images: t("admin.media.invalidType") || "Only image files are allowed",
      }));
    } else if (hasTooLarge) {
      setErrors((err) => ({
        ...err,
        images: t("admin.media.tooLarge") || "File size must be under 5MB",
      }));
    } else if (files.length > availableSlots) {
      setErrors((err) => ({
        ...err,
        images: t("admin.activities.maxImagesReached") || `الحد الأقصى هو ${MAX_IMAGES} صور`,
      }));
    } else {
      setErrors((err) => {
        const next = { ...err };
        delete next.images;
        return next;
      });
    }

    if (addedItems.length > 0) {
      setImageItems((prev) => [...prev, ...addedItems]);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveItem = (id) => {
    setImageItems((prev) => {
      const item = prev.find((x) => x.id === id);
      if (item && item.type === "file" && item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
        objectUrlsRef.current.delete(item.previewUrl);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  // Reordering helpers
  const reorderImages = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= imageItems.length || fromIdx === toIdx) return;
    setImageItems((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy;
    });
  };

  const handleDragStart = (idx) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (idx) => {
    if (draggedIndex !== null && draggedIndex !== idx) {
      reorderImages(draggedIndex, idx);
    }
    setDraggedIndex(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.titleAr.trim()) next.titleAr = t("admin.common.required");
    if (!values.titleEn.trim()) next.titleEn = t("admin.common.required");
    if (!values.category) next.category = t("admin.common.required");
    if (!values.descriptionAr.trim()) next.descriptionAr = t("admin.common.required");
    if (!values.descriptionEn.trim()) next.descriptionEn = t("admin.common.required");

    const isEdit = Boolean(initialValues?.id || initialValues?._id);

    // Require at least one image on create
    if (!isEdit && imageItems.length === 0) {
      next.images = t("admin.common.required") || "يجب إضافة صورة واحدة على الأقل";
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    // Ordered lists matching final user-defined order
    const filesInOrder = imageItems
      .filter((item) => item.type === "file")
      .map((item) => item.file);

    const existingUrlsInOrder = imageItems
      .filter((item) => item.type === "existing")
      .map((item) => item.previewUrl);

    // If editing and user removed all images, send clearImages: true
    const clearImages = isEdit && imageItems.length === 0;

    onSubmit({
      ...values,
      images: filesInOrder,
      existingImages: existingUrlsInOrder,
      clearImages,
      coverImage: filesInOrder[0] || null,
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {/* Title Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          id="activity-title-ar"
          label={t("admin.common.titleAr")}
          value={values.titleAr}
          onChange={set("titleAr")}
          error={errors.titleAr}
          disabled={submitting}
          placeholder="عنوان النشاط بالعربية"
        />
        <Field
          id="activity-title-en"
          label={t("admin.common.titleEn")}
          dir="ltr"
          value={values.titleEn}
          onChange={set("titleEn")}
          error={errors.titleEn}
          disabled={submitting}
          placeholder="Activity title in English"
        />
      </div>

      {/* Category and Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LabeledSelect
          id="activity-category"
          label={t("admin.common.category")}
          value={values.category}
          onChange={set("category")}
          options={activityCategories}
          error={errors.category}
          disabled={submitting}
        />
        <Field
          id="activity-date"
          label={t("admin.common.date")}
          type="date"
          value={values.date}
          onChange={set("date")}
          disabled={submitting}
        />
      </div>

      {/* Description Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5 text-start">
          <label htmlFor="activity-desc-ar" className="text-sm font-semibold text-[#001809]">
            {t("admin.activities.descAr") || "الوصف (عربي)"}
          </label>
          <textarea
            id="activity-desc-ar"
            rows={4}
            value={values.descriptionAr}
            onChange={set("descriptionAr")}
            disabled={submitting}
            placeholder="تفاصيل النشاط بالعربية..."
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 disabled:opacity-60 disabled:bg-gray-50 ${
              errors.descriptionAr
                ? "border-red-500 focus-visible:ring-red-500/30"
                : "border-[#D7DDD7] focus-visible:border-primary focus-visible:ring-primary/40"
            }`}
          />
          {errors.descriptionAr && (
            <p role="alert" className="text-xs text-red-600">
              {errors.descriptionAr}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5 text-start" dir="ltr">
          <label htmlFor="activity-desc-en" className="text-sm font-semibold text-[#001809]">
            {t("admin.activities.descEn") || "Description (English)"}
          </label>
          <textarea
            id="activity-desc-en"
            rows={4}
            value={values.descriptionEn}
            onChange={set("descriptionEn")}
            disabled={submitting}
            placeholder="Activity details in English..."
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 disabled:opacity-60 disabled:bg-gray-50 ${
              errors.descriptionEn
                ? "border-red-500 focus-visible:ring-red-500/30"
                : "border-[#D7DDD7] focus-visible:border-primary focus-visible:ring-primary/40"
            }`}
          />
          {errors.descriptionEn && (
            <p role="alert" className="text-xs text-red-600">
              {errors.descriptionEn}
            </p>
          )}
        </div>
      </div>

      {/* Multiple Images Upload & Reordering Section */}
      <div className="flex flex-col gap-2.5 text-start">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-sm font-semibold text-[#001809]">
            {t("admin.activities.images") || "صور النشاط"}
            <span className="ms-2 text-xs font-normal text-gray-500">
              ({imageItems.length} / {MAX_IMAGES})
            </span>
          </label>
          <span className="text-xs text-[#6B7280]">
            {t("admin.activities.imageLimitHint") || "حتى 10 صور، بحد أقصى 5MB لكل صورة"}
          </span>
        </div>

        {/* UI Hint Box */}
        <div className="flex flex-col gap-1 rounded-lg bg-[#E6F4EA]/70 px-3 py-2 text-xs text-[#0D3B2E] border border-[#C6E7D2]">
          <div className="flex items-center gap-2">
            <Info size={16} className="shrink-0 text-[#006c48]" />
            <span>
              <strong>{t("admin.activities.firstImageHint")}</strong> {t("admin.activities.dragHint")}
            </span>
          </div>
          {initialValues?.id && (
            <p className="text-[11px] text-[#2C6E49] ps-6">
              {t("admin.activities.editImagesNote") || "ملاحظة: عند رفع ملفات صور جديدة سيتم استبدال الصور السابقة، وإذا لم تختر ملفات جديدة سيتم الاحتفاظ بالصور الحالية."}
            </p>
          )}
        </div>

        {/* Uploaded Images List & Reordering */}
        {imageItems.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {imageItems.map((item, idx) => {
              const isCover = idx === 0;
              const isDragging = draggedIndex === idx;

              return (
                <div
                  key={item.id}
                  draggable={!submitting}
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={() => setDraggedIndex(null)}
                  className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-200 ${
                    isCover
                      ? "border-[#006c48] bg-[#F4F8F5] shadow-xs ring-1 ring-[#006c48]"
                      : "border-[#D7DDD7] bg-white hover:border-gray-400"
                  } ${isDragging ? "opacity-40 scale-95 border-dashed" : "opacity-100"}`}
                >
                  {/* Top Badge (Cover indicator or Order index) */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-inherit bg-white/80 backdrop-blur-2xs">
                    <div className="flex items-center gap-1">
                      <GripVertical
                        size={14}
                        className="cursor-grab text-gray-400 active:cursor-grabbing"
                        title="اسحب لإعادة الترتيب"
                      />
                      {isCover ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#0D3B2E] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                          <Star size={10} className="fill-amber-400 text-amber-400" />
                          <span>{t("admin.activities.coverBadge") || "صورة الغلاف"}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-gray-500" dir="ltr">
                          #{idx + 1}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={submitting}
                      onClick={() => handleRemoveItem(item.id)}
                      title={t("admin.activities.removeImage") || "حذف الصورة"}
                      className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative h-28 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  {/* Image Details & Move Controls */}
                  <div className="flex items-center justify-between gap-1 p-2 bg-white text-xs border-t border-[#EDF0ED]">
                    <span className="truncate max-w-[110px] text-[11px] text-gray-600" title={item.name}>
                      {item.name}
                    </span>

                    {/* Move Earlier / Later buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0 || submitting}
                        onClick={() => reorderImages(idx, idx - 1)}
                        title={t("admin.activities.moveRight") || "تحريك للأمام"}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        {dir === "rtl" ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                      </button>
                      <button
                        type="button"
                        disabled={idx === imageItems.length - 1 || submitting}
                        onClick={() => reorderImages(idx, idx + 1)}
                        title={t("admin.activities.moveLeft") || "تحريك للخلف"}
                        className="rounded p-1 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:pointer-events-none"
                      >
                        {dir === "rtl" ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Upload Dropzone / Add Button */}
        {imageItems.length < MAX_IMAGES ? (
          <div
            onClick={() => {
              if (!submitting) fileInputRef.current?.click();
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:border-primary hover:bg-[#F4F8F5] ${
              errors.images ? "border-red-500 bg-red-50/20" : "border-[#D7DDD7] bg-white"
            } ${submitting ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-mint text-primary">
              {imageItems.length > 0 ? <Plus size={20} /> : <UploadCloud size={20} />}
            </div>
            <p className="text-sm font-semibold text-[#001809]">
              {imageItems.length > 0
                ? t("admin.activities.addMoreImages") || "إضافة المزيد من الصور"
                : t("admin.activities.uploadPromptMultiple") || "اضغط لاختيار صورة أو أكثر للنشاط"}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              PNG, JPG, WEBP (حجم أقصى 5MB لكل صورة)
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-center text-xs text-amber-800">
            {t("admin.activities.maxImagesReached") || "تم الوصول للحد الأقصى (10 صور)"}
          </div>
        )}

        <input
          ref={fileInputRef}
          id="activity-images"
          type="file"
          accept="image/*"
          multiple
          disabled={submitting}
          className="hidden"
          onChange={(e) => handleFilesSelected(e.target.files)}
        />

        {errors.images && (
          <p role="alert" className="text-xs text-red-600 font-medium">
            {errors.images}
          </p>
        )}
      </div>

      {/* Form Action Buttons */}
      <div className="flex justify-end gap-2 border-t border-[#EDF0ED] pt-4">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" loading={submitting} disabled={submitting}>
          {submitting
            ? t("admin.activities.savingWithImages") || "جاري حفظ النشاط..."
            : submitLabel}
        </Button>
      </div>
    </form>
  );
}
