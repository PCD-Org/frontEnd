import { useState } from "react";
import { useTranslation } from "../../utils/useTranslation";
import Field from "../../components/ui/admin/Field";
import Button from "../../components/ui/admin/Button";
import { newsCategories } from "./categories";

const emptyValues = {
  titleAr: "",
  titleEn: "",
  category: "",
  summary: "",
  content: "",
  published: true,
  author: "PCED",
  date: new Date().toISOString().slice(0, 10),
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

export default function NewsForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel,
}) {
  const { t } = useTranslation();
  const [values, setValues] = useState({ ...emptyValues, ...initialValues });
  const [errors, setErrors] = useState({});

  const set = (field) => (event) =>
    setValues((v) => ({ ...v, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};
    if (!values.titleAr.trim()) next.titleAr = t("admin.news.errorTitle");
    if (!values.titleEn.trim()) next.titleEn = t("admin.news.errorTitle");
    if (!values.summary.trim()) next.summary = t("admin.common.required");
    if (!values.category) next.category = t("admin.common.required");
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(values);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <Field
        id="news-title-ar"
        label={t("admin.common.titleAr")}
        value={values.titleAr}
        onChange={set("titleAr")}
        error={errors.titleAr}
      />
      <Field
        id="news-title-en"
        label={t("admin.common.titleEn")}
        dir="ltr"
        value={values.titleEn}
        onChange={set("titleEn")}
        error={errors.titleEn}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LabeledSelect
          id="news-category"
          label={t("admin.common.category")}
          value={values.category}
          onChange={set("category")}
          options={newsCategories}
          error={errors.category}
        />
        <Field
          id="news-date"
          label={t("admin.common.date")}
          type="date"
          value={values.date}
          onChange={set("date")}
        />
      </div>
      <Field
        id="news-summary"
        label={t("admin.common.summary")}
        value={values.summary}
        onChange={set("summary")}
        error={errors.summary}
      />
      <div className="flex flex-col gap-1.5 text-start">
        <label htmlFor="news-content" className="text-sm font-semibold text-[#001809]">
          {t("admin.common.content")}
        </label>
        <textarea
          id="news-content"
          rows={5}
          value={values.content}
          onChange={set("content")}
          className="w-full rounded-lg border border-[#D7DDD7] bg-white px-3 py-2 text-sm text-[#001809] outline-none transition-colors placeholder:text-[#9CA3AF] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#001809]">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => setValues((v) => ({ ...v, published: e.target.checked }))}
          className="h-4 w-4 rounded border-[#D7DDD7] accent-primary"
        />
        {t("admin.common.published")}
      </label>
      <div className="flex justify-end gap-2 border-t border-[#EDF0ED] pt-4">
        <Button variant="secondary" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button type="submit" loading={submitting} disabled={submitting}>
          {submitting ? t("common.saving") : submitLabel}
        </Button>
      </div>
    </form>
  );
}
