import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";

const endpoint = "/impact-statistics";

const isMock = () => API_MODE === "mock";

let mockImpactStats = [
  {
    id: "stat-1",
    label: {
      en: "Trees Planted",
      ar: "الأشجار المزروعة",
    },
    value: 15000,
  },
  {
    id: "stat-2",
    label: {
      en: "Volunteers Engaged",
      ar: "المتطوعون المشاركون",
    },
    value: 3500,
  },
];

export const normalizeImpactStat = (item) => {
  if (!item) return null;
  return {
    ...item,
    id: item._id || item.id,
    _id: item._id || item.id,
    label: item.label,
    value: item.value,
  };
};

export const impactStatisticsApi = {
  async getAll() {
    if (isMock()) return withDelay([...mockImpactStats].map(normalizeImpactStat));
    const { data } = await api.get(endpoint);
    const rawList = Array.isArray(data)
      ? data
      : Array.isArray(data?.data?.statistics)
      ? data.data.statistics
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.statistics)
      ? data.statistics
      : [];
    return rawList.map(normalizeImpactStat);
  },

  async create(payload) {
    if (isMock()) {
      const newStat = {
        id: `stat-${Date.now()}`,
        ...payload,
      };
      mockImpactStats = [newStat, ...mockImpactStats];
      return withDelay(newStat);
    }
    const { data } = await api.post(endpoint, payload);
    const rawItem = data?.data?.statistic || data?.data || data;
    return normalizeImpactStat(rawItem);
  },

  async update(id, payload) {
    if (isMock()) {
      mockImpactStats = mockImpactStats.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      );
      return withDelay(mockImpactStats.find((item) => item.id === id));
    }
    const { data } = await api.patch(`${endpoint}/${id}`, payload);
    const rawItem = data?.data?.statistic || data?.data || data;
    return normalizeImpactStat(rawItem);
  },

  async remove(id) {
    if (isMock()) {
      mockImpactStats = mockImpactStats.filter((item) => item.id !== id);
      return withDelay(id);
    }
    await api.delete(`${endpoint}/${id}`);
    return id;
  },
};
