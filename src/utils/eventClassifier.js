/**
 * Helper to identify special events, awareness campaigns, and international days
 * (e.g. Pink October, World Food Day, International Women's Day, etc.)
 */
export function isSpecialEventActivity(activity) {
  if (!activity) return false;

  const catKey =
    typeof activity.category === "object" && activity.category !== null
      ? activity.category.key || activity.category.slug
      : activity.category;

  if (catKey === "events" || catKey === "special-events") {
    return true;
  }

  const titleAr = (
    activity.titleAr ||
    (typeof activity.title === "object" ? activity.title?.ar : activity.title) ||
    ""
  ).toLowerCase();

  const titleEn = (
    activity.titleEn ||
    (typeof activity.title === "object" ? activity.title?.en : "") ||
    ""
  ).toLowerCase();

  const fullText = `${titleAr} ${titleEn}`;

  const eventKeywords = [
    "أكتوبر الوردي",
    "pink october",
    "يوم الأغذية",
    "world food day",
    "اليوم الدولي",
    "اليوم العالمي",
    "international day",
    "يوم المرأة",
    "women's day",
    "موسم الزيتون",
    "olive harvest",
    "فعالية «خلف الستار»",
    "behind the screen",
    "مخيم صيفي",
    "summer camp",
  ];

  return eventKeywords.some((keyword) => fullText.includes(keyword.toLowerCase()));
}

export function getSpecialEventTag(activity, language = "ar") {
  if (!activity) return null;

  const titleAr = (
    activity.titleAr ||
    (typeof activity.title === "object" ? activity.title?.ar : activity.title) ||
    ""
  ).toLowerCase();

  const titleEn = (
    activity.titleEn ||
    (typeof activity.title === "object" ? activity.title?.en : "") ||
    ""
  ).toLowerCase();

  const fullText = `${titleAr} ${titleEn}`;

  if (fullText.includes("أكتوبر الوردي") || fullText.includes("pink october")) {
    return language === "ar" ? "🎀 أكتوبر الوردي" : "🎀 Pink October";
  }
  if (fullText.includes("يوم الأغذية") || fullText.includes("world food day")) {
    return language === "ar" ? "🌾 يوم الأغذية العالمي" : "🌾 World Food Day";
  }
  if (fullText.includes("المرأة الريفية") || fullText.includes("rural women")) {
    return language === "ar" ? "👩‍🌾 يوم المرأة الريفية" : "👩‍🌾 Rural Women Day";
  }
  if (fullText.includes("موسم الزيتون") || fullText.includes("olive harvest")) {
    return language === "ar" ? "🫒 موسم الزيتون" : "🫒 Olive Harvest";
  }
  if (fullText.includes("مخيم صيفي") || fullText.includes("summer camp")) {
    return language === "ar" ? "☀️ مخيم صيفي" : "☀️ Summer Camp";
  }

  return language === "ar" ? "✨ مناسبة خاصة" : "✨ Special Occasion";
}
