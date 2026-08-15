let items = [
  {
    id: "activity-1",
    titleAr: "جلسة حوارية حول التعليم والتنمية في غزة",
    titleEn: "Discussion Session on Education and Development in Gaza",
    category: "workshops",
    summary:
      "مشاركة خبراء وأكاديميين في وضع خارطة طريق لتحسين المنظومة التعليمية والبيئية.",
    date: "2026-01-15",
  },
  {
    id: "activity-2",
    titleAr: "توزيع طرود غذائية بالتعاون مع صندوق الاستثمار الفلسطيني",
    titleEn: "Food Parcels Distribution with the Palestine Investment Fund",
    category: "relief",
    summary: "توزيع مساعدات غذائية طارئة للعائلات المتضررة في غزة.",
    date: "2026-01-22",
  },
];

export const activitiesStore = {
  list: () => [...items],
  get: (id) => items.find((item) => item.id === id),
  add: (payload) => {
    const item = { ...payload, id: `activity-${Date.now()}` };
    items = [item, ...items];
    return item;
  },
  update: (id, payload) => {
    items = items.map((item) => (item.id === id ? { ...item, ...payload } : item));
    return items.find((item) => item.id === id);
  },
  remove: (id) => {
    items = items.filter((item) => item.id !== id);
  },
};
