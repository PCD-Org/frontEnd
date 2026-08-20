import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { mediaStore, createMockMediaItem } from "../features/media/mockMedia";

const endpoint = "/media";

const isMock = () => API_MODE === "mock";

export const mediaApi = {
  async getAll() {
    if (isMock()) return withDelay(mediaStore.list());
    const { data } = await api.get(endpoint);
    return data.data ?? data;
  },

  async upload(file) {
    if (isMock()) {
      const item = await createMockMediaItem(file);
      return withDelay(mediaStore.add(item));
    }
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post(endpoint, formData);
    return data.data ?? data;
  },

  async remove(id) {
    if (isMock()) {
      mediaStore.remove(id);
      return withDelay(id);
    }
    await api.delete(`${endpoint}/${id}`);
    return id;
  },
};
