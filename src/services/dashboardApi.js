import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";
import { mediaStore } from "../features/media/mockMedia";
import { newsStore } from "../features/news/mockNews";
import { activitiesStore } from "../features/activities/mockActivities";
import { researchStore } from "../features/research/mockResearch";
import { activitiesApi } from "./activitiesApi";

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
    try {
      const { data } = await api.get("/dashboard/stats");
      return data?.data ?? data;
    } catch {
      // Fallback gracefully without breaking UI
      try {
        const activities = await activitiesApi.getAll();
        return {
          media: 0,
          news: 0,
          activities: Array.isArray(activities) ? activities.length : 0,
          research: 0,
        };
      } catch {
        return {
          media: 0,
          news: 0,
          activities: 0,
          research: 0,
        };
      }
    }
  },

  async getRecentMedia() {
    if (isMock()) {
      return withDelay(mediaStore.list().slice(0, 5));
    }
    try {
      const { data } = await api.get("/media?limit=5");
      const rawList = Array.isArray(data)
        ? data
        : Array.isArray(data?.data?.media)
        ? data.data.media
        : Array.isArray(data?.data)
        ? data.data
        : [];
      return rawList.map((m) => ({ ...m, id: m._id || m.id }));
    } catch {
      return [];
    }
  },
};
