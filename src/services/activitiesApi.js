import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { activitiesStore } from "../features/activities/mockActivities";

const endpoint = "/activities";

const isMock = () => API_MODE === "mock";

export const normalizeActivity = (raw) => {
  if (!raw) return null;
  const id = raw._id || raw.id || raw.slug;

  const categoryKey =
    typeof raw.category === "object" && raw.category !== null
      ? raw.category.key || raw.category.name?.en?.toLowerCase() || ""
      : typeof raw.category === "string"
      ? raw.category
      : "";

  const coverImageUrl =
    typeof raw.coverImage === "object" && raw.coverImage !== null
      ? raw.coverImage.url
      : typeof raw.coverImage === "string"
      ? raw.coverImage
      : raw.image || null;

  const titleAr =
    typeof raw.title === "object" && raw.title !== null
      ? raw.title?.ar || ""
      : raw.titleAr || (typeof raw.title === "string" ? raw.title : "");

  const titleEn =
    typeof raw.title === "object" && raw.title !== null
      ? raw.title?.en || ""
      : raw.titleEn || "";

  const descriptionAr =
    typeof raw.description === "object" && raw.description !== null
      ? raw.description?.ar || ""
      : raw.descriptionAr || (typeof raw.description === "string" ? raw.description : "");

  const descriptionEn =
    typeof raw.description === "object" && raw.description !== null
      ? raw.description?.en || ""
      : raw.descriptionEn || "";

  return {
    ...raw,
    id,
    _id: id,
    category: categoryKey || raw.category || "development",
    rawCategory: raw.category,
    coverImage: coverImageUrl,
    image: coverImageUrl || raw.image,
    title: raw.title || { ar: titleAr, en: titleEn },
    titleAr,
    titleEn,
    description: raw.description || { ar: descriptionAr, en: descriptionEn },
    descriptionAr,
    descriptionEn,
    summary: descriptionAr || descriptionEn || raw.summary || "",
    date: raw.date
      ? typeof raw.date === "string"
        ? raw.date.split("T")[0]
        : raw.date
      : "",
  };
};

const buildActivityFormData = (payload) => {
  if (payload instanceof FormData) {
    return payload;
  }

  const formData = new FormData();

  if (payload.coverImage && payload.coverImage instanceof File) {
    formData.append("coverImage", payload.coverImage);
  }

  // Handle title as JSON string
  const titleAr =
    payload.titleAr !== undefined
      ? payload.titleAr
      : typeof payload.title === "object"
      ? payload.title?.ar || ""
      : payload.title || "";
  const titleEn =
    payload.titleEn !== undefined
      ? payload.titleEn
      : typeof payload.title === "object"
      ? payload.title?.en || ""
      : "";

  formData.append(
    "title",
    JSON.stringify({
      ar: titleAr || "",
      en: titleEn || "",
    })
  );

  // Handle description as JSON string
  const descAr =
    payload.descriptionAr !== undefined
      ? payload.descriptionAr
      : typeof payload.description === "object"
      ? payload.description?.ar || ""
      : payload.summary || "";
  const descEn =
    payload.descriptionEn !== undefined
      ? payload.descriptionEn
      : typeof payload.description === "object"
      ? payload.description?.en || ""
      : "";

  formData.append(
    "description",
    JSON.stringify({
      ar: descAr || "",
      en: descEn || "",
    })
  );

  if (payload.category) {
    const cat = payload.category === "psycho" ? "psychosocial" : payload.category;
    formData.append("category", cat);
  }

  if (payload.date) {
    formData.append("date", payload.date);
  }

  return formData;
};

export const activitiesApi = {
  async getAll(params) {
    if (isMock()) return withDelay(activitiesStore.list().map(normalizeActivity));
    const { data } = await api.get(endpoint, { params });
    const rawList = Array.isArray(data)
      ? data
      : Array.isArray(data?.data?.activities)
      ? data.data.activities
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.activities)
      ? data.activities
      : [];
    return rawList.map(normalizeActivity);
  },

  async getById(id) {
    if (isMock()) return withDelay(normalizeActivity(activitiesStore.get(id)));
    const { data } = await api.get(`${endpoint}/${id}`);
    const rawItem =
      data?.data?.activity || data?.data || data?.activity || data;
    return normalizeActivity(rawItem);
  },

  async create(payload) {
    if (isMock()) return withDelay(normalizeActivity(activitiesStore.add(payload)));
    const body = buildActivityFormData(payload);
    const { data } = await api.post(endpoint, body);
    const rawItem =
      data?.data?.activity || data?.data || data?.activity || data;
    return normalizeActivity(rawItem);
  },

  async update(id, payload) {
    if (isMock()) return withDelay(normalizeActivity(activitiesStore.update(id, payload)));
    const body = buildActivityFormData(payload);
    const { data } = await api.patch(`${endpoint}/${id}`, body);
    const rawItem =
      data?.data?.activity || data?.data || data?.activity || data;
    return normalizeActivity(rawItem);
  },

  async remove(id) {
    if (isMock()) {
      activitiesStore.remove(id);
      return withDelay(id);
    }
    await api.delete(`${endpoint}/${id}`);
    return id;
  },
};
