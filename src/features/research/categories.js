export const researchCategories = [
  { value: "biodiversity", labelKey: "admin.research.cat.biodiversity" },
  { value: "foodSecurity", labelKey: "admin.research.cat.foodSecurity" },
  { value: "policies", labelKey: "admin.research.cat.policies" },
];

export const categoryLabelKey = (value) =>
  researchCategories.find((c) => c.value === value)?.labelKey ?? null;
