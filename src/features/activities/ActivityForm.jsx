import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../utils/useTranslation";
import Field from "../../components/ui/admin/Field";
import Button from "../../components/ui/admin/Button";
import { activityCategories } from "./categories";
import { UploadCloud, X } from "lucide-react";

const emptyValues = {
  titleAr: "",
  titleEn: "",
  descriptionAr: "",
  descriptionEn: "",
  category: "development",
  date: new Date().toISOString().slice(0, 10),
  coverImage: null,
};

function LabeledSelect({ id, label, value, onChange, options, error }) {
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
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 w-full rounded-lg border bg-white px-3 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 ${
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
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const [selectedPreview, setSelectedPreview] = useState(null);

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
      coverImage: null,
      existingImage: initialValues?.coverImage || initialValues?.image || null,
    };
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      if (selectedPreview) {
        URL.revokeObjectURL(selectedPreview);
      }
    };
  }, [selectedPreview]);

  const set = (field) => (event) =>
    setValues((v) => ({ ...v, [field]: event.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      setErrors((err) => ({
        ...err,
        coverImage: t("admin.media.invalidType") || "Only image files are allowed",
      }));
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((err) => ({
        ...err,
        coverImage: t("admin.media.tooLarge") || "File size must be under 5MB",
      }));
      return;
    }

    setErrors((err) => {
      const next = { ...err };
      delete next.coverImage;
      return next;
    });

    if (selectedPreview) {
      URL.revokeObjectURL(selectedPreview);
    }
    const previewUrl = URL.createObjectURL(file);
    setSelectedPreview(previewUrl);
    setValues((v) => ({ ...v, coverImage: file }));
  };

  const handleRemoveSelectedFile = () => {
    if (selectedPreview) {
      URL.revokeObjectURL(selectedPreview);
      setSelectedPreview(null);
    }
    setValues((v) => ({ ...v, coverImage: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.titleAr.trim()) next.titleAr = t("admin.common.required");
    if (!values.titleEn.trim()) next.titleEn = t("admin.common.required");
    if (!values.category) next.category = t("admin.common.required");
    if (!values.descriptionAr.trim()) next.descriptionAr = t("admin.common.required");
    if (!values.descriptionEn.trim()) next.descriptionEn = t("admin.common.required");

    // Require image on create if no existing image
    const hasImage = Boolean(values.coverImage || values.existingImage);
    if (!initialValues?.id && !initialValues?._id && !hasImage) {
      next.coverImage = t("admin.common.required");
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit(values);
  };

  const currentDisplayImage = selectedPreview || values.existingImage;

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      {/* Title Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          id="activity-title-ar"
          label={t("admin.common.titleAr")}
          value={values.titleAr}
          onChange={set("titleAr")}
          error={errors.titleAr}
          placeholder="عنوان النشاط بالعربية"
        />
        <Field
          id="activity-title-en"
          label={t("admin.common.titleEn")}
          dir="ltr"
          value={values.titleEn}
          onChange={set("titleEn")}
          error={errors.titleEn}
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
        />
        <Field
          id="activity-date"
          label={t("admin.common.date")}
          type="date"
          value={values.date}
          onChange={set("date")}
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
            placeholder="تفاصيل النشاط بالعربية..."
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 ${
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
            placeholder="Activity details in English..."
            className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#001809] outline-none transition-colors focus-visible:ring-2 ${
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

      {/* Cover Image Upload & Preview */}
      <div className="flex flex-col gap-2 text-start">
        <label htmlFor="activity-cover" className="text-sm font-semibold text-[#001809]">
          {t("admin.activities.coverImage") || "صورة الغلاف / Cover Image"}
        </label>

        {currentDisplayImage ? (
          <div className="relative flex items-center gap-4 rounded-xl border border-[#E5E7E5] bg-[#FAF9F8] p-3">
            <img
              src={currentDisplayImage}
              alt="Cover Preview"
              className="h-20 w-28 rounded-lg object-cover border border-[#D7DDD7]"
            />
            <div className="flex-1 min-w-0">
              <p className="truncate text-xs font-semibold text-[#001809]">
                {values.coverImage ? values.coverImage.name : t("admin.activities.currentImage") || "الصورة الحالية"}
              </p>
              {values.coverImage && (
                <p className="text-[11px] text-[#6B7280]">
                  {(values.coverImage.size / 1024).toFixed(1)} KB
                </p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t("admin.activities.replaceImage") || "استبدال الصورة"}
                </Button>
                {values.coverImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveSelectedFile}
                  >
                    <X size={14} className="me-1" />
                    {t("common.cancel") || "إلغاء التحديد"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-colors hover:border-primary hover:bg-[#F4F8F5] ${
              errors.coverImage ? "border-red-500 bg-red-50/20" : "border-[#D7DDD7] bg-white"
            }`}
          >
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-mint text-primary">
              <UploadCloud size={20} />
            </div>
            <p className="text-sm font-semibold text-[#001809]">
              {t("admin.activities.uploadPrompt") || "اضغط لاختيار صورة الغلاف"}
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              PNG, JPG, WEBP (حجم أقصى 5MB)
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="activity-cover"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {errors.coverImage && (
          <p role="alert" className="text-xs text-red-600">
            {errors.coverImage}
          </p>
        )}
      </div>

      {/* Form Action Buttons */}
      <div className="flex justify-end gap-2 border-t border-[#EDF0ED] pt-4">
        <Button variant="secondary" onClick={onCancel} disabled={submitting}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" loading={submitting} disabled={submitting}>
          {submitting ? t("common.saving") : submitLabel}
        </Button>
      </div>
    </form>
  );
}
