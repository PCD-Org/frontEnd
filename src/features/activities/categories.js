export const activityCategories = [
  { value: "relief", labelKey: "admin.activities.cat.relief" },
  { value: "psycho", labelKey: "admin.activities.cat.psycho" },
  { value: "workshops", labelKey: "admin.activities.cat.workshops" },
  { value: "development", labelKey: "admin.activities.cat.development" },
];

export const categoryLabelKey = (value) =>
  activityCategories.find((c) => c.value === value)?.labelKey ?? null;
