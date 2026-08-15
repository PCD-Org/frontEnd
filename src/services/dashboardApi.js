import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { mediaStore } from "../features/media/mockMedia";
import { newsStore } from "../features/news/mockNews";
import { activitiesStore } from "../features/activities/mockActivities";
import { researchStore } from "../features/research/mockResearch";

const isMock = () => API_MODE === "mock";

export const dashboardApi = {
  async getStats() {
    if (isMock()) {
      return withDelay({
        media: mediaStore.list().length,
        news: newsStore.list().length,
        activities: activitiesStore.list().length,
        research: researchStore.list().length,
      });
    }
    const { data } = await api.get("/api/dashboard/stats");
    return data.data ?? data;
  },

  async getRecentMedia() {
    if (isMock()) {
      return withDelay(mediaStore.list().slice(0, 5));
    }
    const { data } = await api.get("/api/media?limit=5");
    return data.data ?? data;
  },
};
