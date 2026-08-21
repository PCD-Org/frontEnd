export const activityCategories = [
  { value: "development", labelKey: "admin.activities.cat.development" },
  { value: "relief", labelKey: "admin.activities.cat.relief" },
  { value: "psychosocial", labelKey: "admin.activities.cat.psycho" },
  { value: "workshops", labelKey: "admin.activities.cat.workshops" },
];

export const categoryLabelKey = (value) => {
  const normalized = value === "psycho" ? "psychosocial" : value;
  return activityCategories.find((c) => c.value === normalized)?.labelKey ?? null;
};
