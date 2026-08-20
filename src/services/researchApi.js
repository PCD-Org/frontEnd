import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { researchStore } from "../features/research/mockResearch";

const endpoint = "/research";

const isMock = () => API_MODE === "mock";

export const researchApi = {
  async getAll() {
    if (isMock()) return withDelay(researchStore.list());
    const { data } = await api.get(endpoint);
    return data.data ?? data;
  },

  async create(payload) {
    if (isMock()) return withDelay(researchStore.add(payload));
    const { data } = await api.post(endpoint, payload);
    return data.data ?? data;
  },

  async update(id, payload) {
    if (isMock()) return withDelay(researchStore.update(id, payload));
    const { data } = await api.patch(`${endpoint}/${id}`, payload);
    return data.data ?? data;
  },

  async remove(id) {
    if (isMock()) {
      researchStore.remove(id);
      return withDelay(id);
    }
    await api.delete(`${endpoint}/${id}`);
    return id;
  },
};
