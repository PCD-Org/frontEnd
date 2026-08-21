import { activitiesApi } from "./activitiesApi";
import { impactStatisticsApi } from "./impactStatisticsApi";
import { contactInquiriesApi } from "./contactInquiriesApi";

export const dashboardApi = {
  async getSummary() {
    const [activitiesRes, impactStatsRes, inquiriesRes] = await Promise.allSettled([
      activitiesApi.getAll(),
      impactStatisticsApi.getAll(),
      contactInquiriesApi.getAll(),
    ]);

    const activities =
      activitiesRes.status === "fulfilled" && Array.isArray(activitiesRes.value)
        ? activitiesRes.value
        : [];
    const impactStats =
      impactStatsRes.status === "fulfilled" && Array.isArray(impactStatsRes.value)
        ? impactStatsRes.value
        : [];
    const inquiries =
      inquiriesRes.status === "fulfilled" && Array.isArray(inquiriesRes.value)
        ? inquiriesRes.value
        : [];

    const newInquiriesCount = inquiries.filter((item) => item.status === "new").length;

    return {
      totalActivities: activities.length,
      totalImpactStats: impactStats.length,
      totalInquiries: inquiries.length,
      newInquiries: newInquiriesCount,
      recentActivities: activities.slice(0, 5),
      recentInquiries: inquiries.slice(0, 5),
    };
  },

  async getStats() {
    const summary = await this.getSummary();
    return {
      activities: summary.totalActivities,
      impactStats: summary.totalImpactStats,
      inquiries: summary.totalInquiries,
      newInquiries: summary.newInquiries,
    };
  },
};
