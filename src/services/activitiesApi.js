import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { activitiesStore } from "../features/activities/mockActivities";

const endpoint = "/api/activities";

const isMock = () => API_MODE === "mock";

export const activitiesApi = {
  async getAll() {
    if (isMock()) return withDelay(activitiesStore.list());
    const { data } = await api.get(endpoint);
    return data.data ?? data;
  },

  async create(payload) {
    if (isMock()) return withDelay(activitiesStore.add(payload));
    const { data } = await api.post(endpoint, payload);
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
