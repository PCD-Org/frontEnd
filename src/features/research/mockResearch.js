let items = [
  {
    id: "research-1",
    titleAr: "دراسة التنوع الحيوي في الساحل الفلسطيني",
    titleEn: "Biodiversity Study of the Palestinian Coast",
    category: "biodiversity",
    summary: "دراسة ميدانية لتوثيق الأنواع البحرية والساحلية في قطاع غزة.",
    pdfUrl: "",
    published: true,
    date: "2026-01-05",
  },
  {
    id: "research-2",
    titleAr: "سياسات الأمن الغذائي في ظل التغير المناخي",
    titleEn: "Food Security Policies Under Climate Change",
    category: "foodSecurity",
    summary: "ورقة سياسات تستعرض تحديات الأمن الغذائي ومقترحات التكيف المناخي.",
    pdfUrl: "",
    published: false,
    date: "2026-01-18",
  },
];

export const researchStore = {
  list: () => [...items],
  get: (id) => items.find((item) => item.id === id),
  add: (payload) => {
    const item = { ...payload, id: `research-${Date.now()}` };
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
