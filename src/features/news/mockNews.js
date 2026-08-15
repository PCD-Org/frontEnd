let items = [
  {
    id: "news-1",
    titleAr: "الهيئة تطلق برنامجاً جديداً للتوعية البيئية",
    titleEn: "PCED Launches a New Environmental Awareness Program",
    category: "environment",
    summary:
      "برنامج متكامل يستهدف المدارس والمجتمعات المحلية لتعزيز ثقافة الحفاظ على البيئة.",
    content:
      "أطلقت الهيئة برنامجاً جديداً للتوعية البيئية بالشراكة مع مؤسسات محلية، بهدف نشر الوعي البيئي بين فئات المجتمع كافة.",
    published: true,
    author: "PCED",
    date: "2026-02-01",
  },
  {
    id: "news-2",
    titleAr: "ورشة عمل حول التغير المناخي في غزة",
    titleEn: "Climate Change Workshop in Gaza",
    category: "environment",
    summary:
      "ورشة عمل جمعت خبراء وأكاديميين لمناقشة تحديات التغير المناخي وتأثيره على القطاع.",
    content:
      "نظمت الهيئة ورشة عمل حول التغير المناخي شارك فيها خبراء من الجامعات والمؤسسات الحكومية.",
    published: false,
    author: "PCED",
    date: "2026-02-08",
  },
];

export const newsStore = {
  list: () => [...items],
  get: (id) => items.find((item) => item.id === id),
  add: (payload) => {
    const item = { ...payload, id: `news-${Date.now()}` };
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
