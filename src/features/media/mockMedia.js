import logo from "../../assets/Logo.png";
import fieldPhoto from "../../assets/79a6c5cb8ad4f873287640653a8177127eca0c9b.jpg";

let items = [
  {
    id: "media-1",
    filename: "logo.png",
    url: logo,
    type: "image/png",
    size: 18432,
    width: 512,
    height: 512,
    uploadedAt: "2026-01-10T09:00:00.000Z",
  },
  {
    id: "media-2",
    filename: "field-photo.jpg",
    url: fieldPhoto,
    type: "image/jpeg",
    size: 245760,
    width: null,
    height: null,
    uploadedAt: "2026-01-12T14:30:00.000Z",
  },
];

export function createMockMediaItem(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const base = {
      id: `media-${Date.now()}`,
      filename: file.name,
      url,
      type: file.type || "application/octet-stream",
      size: file.size,
      width: null,
      height: null,
      uploadedAt: new Date().toISOString(),
    };
    const img = new Image();
    img.onload = () =>
      resolve({ ...base, width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => resolve(base);
    img.src = url;
  });
}

export const mediaStore = {
  list: () => [...items],
  add: (item) => {
    items = [item, ...items];
    return item;
  },
  remove: (id) => {
    items = items.filter((item) => item.id !== id);
  },
  get: (id) => items.find((item) => item.id === id),
};
