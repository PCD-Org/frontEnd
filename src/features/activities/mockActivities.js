import defaultActivityImage from "../../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

let items = [
  {
    id: "activity-1",
    titleAr: "جلسة حوارية حول التعليم والتنمية في غزة",
    titleEn: "Discussion Session on Education and Development in Gaza",
    category: "workshops",
    summary:
      "مشاركة خبراء وأكاديميين في وضع خارطة طريق لتحسين المنظومة التعليمية والبيئية.",
    date: "2026-01-15",
    images: [defaultActivityImage],
    coverImage: defaultActivityImage,
  },
  {
    id: "activity-2",
    titleAr: "توزيع طرود غذائية بالتعاون مع صندوق الاستثمار الفلسطيني",
    titleEn: "Food Parcels Distribution with the Palestine Investment Fund",
    category: "relief",
    summary: "توزيع مساعدات غذائية طارئة للعائلات المتضررة في غزة.",
    date: "2026-01-22",
    images: [defaultActivityImage],
    coverImage: defaultActivityImage,
  },
];

export const activitiesStore = {
  list: () => [...items],
  get: (id) => items.find((item) => item.id === id),
  add: (payload) => {
    const processedImages = Array.isArray(payload.images)
      ? payload.images.map((img) => (img instanceof File ? URL.createObjectURL(img) : img))
      : payload.coverImage instanceof File
      ? [URL.createObjectURL(payload.coverImage)]
      : [];
    const finalImages =
      processedImages.length > 0
        ? processedImages
        : Array.isArray(payload.existingImages)
        ? payload.existingImages
        : [];
    const item = {
      ...payload,
      id: `activity-${Date.now()}`,
      images: finalImages,
      coverImage: finalImages[0] || null,
    };
    items = [item, ...items];
    return item;
  },
  update: (id, payload) => {
    const processedImages = Array.isArray(payload.images)
      ? payload.images.map((img) => (img instanceof File ? URL.createObjectURL(img) : img))
      : payload.coverImage instanceof File
      ? [URL.createObjectURL(payload.coverImage)]
      : [];
    const existing = Array.isArray(payload.existingImages) ? payload.existingImages : [];
    const finalImages = [...existing, ...processedImages];

    items = items.map((item) =>
      item.id === id
        ? {
            ...item,
            ...payload,
            images: finalImages.length > 0 ? finalImages : item.images || [],
            coverImage: finalImages[0] || item.coverImage || null,
          }
        : item
    );
    return items.find((item) => item.id === id);
  },
  remove: (id) => {
    items = items.filter((item) => item.id !== id);
  },
};
