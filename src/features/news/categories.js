export const newsCategories = [
  { value: "environment", labelKey: "admin.news.cat.environment" },
  { value: "development", labelKey: "admin.news.cat.development" },
  { value: "youth", labelKey: "admin.news.cat.youth" },
  { value: "general", labelKey: "admin.news.cat.general" },
];

export const categoryLabelKey = (value) =>
  newsCategories.find((c) => c.value === value)?.labelKey ?? null;
