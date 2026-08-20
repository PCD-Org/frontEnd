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

  // Normalize category aliases (e.g., psychosocial -> psycho)
  const normalizedCategory =
    categoryKey === "psychosocial" ? "psycho" : categoryKey;

  const coverImageUrl =
    typeof raw.coverImage === "object" && raw.coverImage !== null
      ? raw.coverImage.url
      : typeof raw.coverImage === "string"
      ? raw.coverImage
      : raw.image || null;

  return {
    ...raw,
    id,
    _id: id,
    category: normalizedCategory || raw.category,
    rawCategory: raw.category,
    coverImage: coverImageUrl,
    image: coverImageUrl || raw.image,
    title: raw.title,
    titleAr:
      typeof raw.title === "object"
        ? raw.title?.ar
        : raw.titleAr || (typeof raw.title === "string" ? raw.title : ""),
    titleEn:
      typeof raw.title === "object"
        ? raw.title?.en
        : raw.titleEn || "",
    description: raw.description,
    descriptionAr:
      typeof raw.description === "object"
        ? raw.description?.ar
        : raw.descriptionAr ||
          (typeof raw.description === "string" ? raw.description : ""),
    descriptionEn:
      typeof raw.description === "object"
        ? raw.description?.en
        : raw.descriptionEn || "",
    summary:
      typeof raw.description === "object"
        ? raw.description?.ar || raw.description?.en
        : raw.summary || (typeof raw.description === "string" ? raw.description : ""),
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
  if (payload.titleAr !== undefined || payload.titleEn !== undefined) {
    formData.append(
      "title",
      JSON.stringify({
        ar: payload.titleAr || "",
        en: payload.titleEn || "",
      })
    );
  } else if (typeof payload.title === "object" && payload.title !== null) {
    formData.append("title", JSON.stringify(payload.title));
  } else if (typeof payload.title === "string") {
    formData.append("title", payload.title);
  }

  // Handle description as JSON string
  if (
    payload.descriptionAr !== undefined ||
    payload.descriptionEn !== undefined ||
    payload.summary !== undefined
  ) {
    formData.append(
      "description",
      JSON.stringify({
        ar: payload.descriptionAr || payload.summary || "",
        en: payload.descriptionEn || payload.summary || "",
      })
    );
  } else if (
    typeof payload.description === "object" &&
    payload.description !== null
  ) {
    formData.append("description", JSON.stringify(payload.description));
  } else if (typeof payload.description === "string") {
    formData.append("description", payload.description);
  }

  if (payload.category) {
    formData.append("category", payload.category);
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
