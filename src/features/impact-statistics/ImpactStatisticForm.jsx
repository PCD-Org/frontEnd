import { useState } from "react";
import { useTranslation } from "../../utils/useTranslation";
import Field from "../../components/ui/admin/Field";
import Button from "../../components/ui/admin/Button";

const emptyValues = {
  labelAr: "",
  labelEn: "",
  value: "",
};

export default function ImpactStatisticForm({
  initialValues,
  onSubmit,
  onCancel,
  submitting,
  submitLabel,
}) {
  const { t } = useTranslation();

  const [values, setValues] = useState(() => ({
    ...emptyValues,
    ...initialValues,
    labelAr:
      initialValues?.labelAr ||
      (typeof initialValues?.label === "object" ? initialValues?.label?.ar : initialValues?.label) ||
      "",
    labelEn:
      initialValues?.labelEn ||
      (typeof initialValues?.label === "object" ? initialValues?.label?.en : "") ||
      "",
    value: initialValues?.value !== undefined ? String(initialValues.value) : "",
  }));

  const [errors, setErrors] = useState({});

  const set = (field) => (event) =>
    setValues((v) => ({ ...v, [field]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {};

    if (!values.labelAr.trim()) {
      next.labelAr = t("admin.common.required");
    }
    if (!values.labelEn.trim()) {
      next.labelEn = t("admin.common.required");
    }

    const num = Number(values.value);
    if (values.value === "" || isNaN(num) || num < 0) {
      next.value = t("admin.impactStats.invalidValue") || t("admin.common.required");
    }

    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({
      labelAr: values.labelAr.trim(),
      labelEn: values.labelEn.trim(),
      value: num,
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field
          id="stat-label-ar"
          label={t("admin.impactStats.labelAr") || "التسمية (عربي)"}
          value={values.labelAr}
          onChange={set("labelAr")}
          error={errors.labelAr}
          placeholder="مثال: الأشجار المزروعة"
        />
        <Field
          id="stat-label-en"
          label={t("admin.impactStats.labelEn") || "Label (English)"}
          dir="ltr"
          value={values.labelEn}
          onChange={set("labelEn")}
          error={errors.labelEn}
          placeholder="e.g. Trees Planted"
        />
      </div>

      <Field
        id="stat-value"
        label={t("admin.impactStats.value") || "القيمة العددية"}
        type="number"
        min="0"
        step="1"
        dir="ltr"
        value={values.value}
        onChange={set("value")}
        error={errors.value}
        placeholder="15000"
      />

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
