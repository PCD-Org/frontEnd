import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { newsStore } from "../features/news/mockNews";

const endpoint = "/news";

const isMock = () => API_MODE === "mock";

export const newsApi = {
  async getAll() {
    if (isMock()) return withDelay(newsStore.list());
    const { data } = await api.get(endpoint);
    return data.data ?? data;
  },

  async getById(id) {
    if (isMock()) return withDelay(newsStore.get(id));
    const { data } = await api.get(`${endpoint}/${id}`);
    return data.data ?? data;
  },

  async create(payload) {
    if (isMock()) return withDelay(newsStore.add(payload));
    const { data } = await api.post(endpoint, payload);
    return data.data ?? data;
  },

  async update(id, payload) {
    if (isMock()) return withDelay(newsStore.update(id, payload));
    const { data } = await api.patch(`${endpoint}/${id}`, payload);
    return data.data ?? data;
  },

  async remove(id) {
    if (isMock()) {
      newsStore.remove(id);
      return withDelay(id);
    }
    await api.delete(`${endpoint}/${id}`);
    return id;
  },
};
