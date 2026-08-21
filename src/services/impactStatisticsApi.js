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
  const id = item._id || item.id;
  const labelAr =
    typeof item.label === "object" ? item.label?.ar || "" : item.labelAr || item.label || "";
  const labelEn =
    typeof item.label === "object" ? item.label?.en || "" : item.labelEn || "";

  return {
    ...item,
    id,
    _id: id,
    label: {
      ar: labelAr,
      en: labelEn,
    },
    labelAr,
    labelEn,
    value: Number(item.value) || 0,
    createdAt: item.createdAt || null,
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
    const formattedPayload = {
      label: {
        ar: payload.labelAr || (typeof payload.label === "object" ? payload.label?.ar : payload.label) || "",
        en: payload.labelEn || (typeof payload.label === "object" ? payload.label?.en : "") || "",
      },
      value: Number(payload.value),
    };

    if (isMock()) {
      const newStat = {
        id: `stat-${Date.now()}`,
        _id: `stat-${Date.now()}`,
        ...formattedPayload,
        createdAt: new Date().toISOString(),
      };
      mockImpactStats = [newStat, ...mockImpactStats];
      return withDelay(normalizeImpactStat(newStat));
    }
    const { data } = await api.post(endpoint, formattedPayload);
    const rawItem = data?.data?.statistic || data?.data || data;
    return normalizeImpactStat(rawItem);
  },

  async update(id, payload) {
    const formattedPayload = {
      ...(payload.labelAr !== undefined || payload.labelEn !== undefined || payload.label
        ? {
            label: {
              ar: payload.labelAr || (typeof payload.label === "object" ? payload.label?.ar : payload.label) || "",
              en: payload.labelEn || (typeof payload.label === "object" ? payload.label?.en : "") || "",
            },
          }
        : {}),
      ...(payload.value !== undefined ? { value: Number(payload.value) } : {}),
    };

    if (isMock()) {
      mockImpactStats = mockImpactStats.map((item) =>
        item.id === id ? { ...item, ...formattedPayload } : item
      );
      return withDelay(normalizeImpactStat(mockImpactStats.find((item) => item.id === id)));
    }
    const { data } = await api.patch(`${endpoint}/${id}`, formattedPayload);
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
