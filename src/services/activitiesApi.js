import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { activitiesStore } from "../features/activities/mockActivities";

const endpoint = "/activities";

const isMock = () => API_MODE === "mock";

const buildActivityFormData = (payload) => {
  if (payload instanceof FormData) {
    return payload;
  }

  const formData = new FormData();

  if (payload.coverImage) {
    formData.append("coverImage", payload.coverImage);
  }

  // Handle title as JSON string
  if (typeof payload.title === "string") {
    formData.append("title", payload.title);
  } else if (payload.title && typeof payload.title === "object") {
    formData.append("title", JSON.stringify(payload.title));
  } else if (payload.titleAr !== undefined || payload.titleEn !== undefined) {
    formData.append(
      "title",
      JSON.stringify({
        ar: payload.titleAr || "",
        en: payload.titleEn || "",
      })
    );
  }

  // Handle description as JSON string
  if (typeof payload.description === "string") {
    formData.append("description", payload.description);
  } else if (payload.description && typeof payload.description === "object") {
    formData.append("description", JSON.stringify(payload.description));
  } else if (
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
    if (isMock()) return withDelay(activitiesStore.list());
    const { data } = await api.get(endpoint, { params });
    return data.data ?? data;
  },

  async getById(id) {
    if (isMock()) return withDelay(activitiesStore.get(id));
    const { data } = await api.get(`${endpoint}/${id}`);
    return data.data ?? data;
  },

  async create(payload) {
    if (isMock()) return withDelay(activitiesStore.add(payload));
    const body = buildActivityFormData(payload);
    const { data } = await api.post(endpoint, body);
    return data.data ?? data;
  },

  async update(id, payload) {
    if (isMock()) return withDelay(activitiesStore.update(id, payload));
    const { data } = await api.patch(`${endpoint}/${id}`, payload);
    return data.data ?? data;
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
