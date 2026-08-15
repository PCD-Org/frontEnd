import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../services/dashboardApi";

export function useDashboard() {
  const stats = useQuery({
    queryKey: ["admin", "dashboard", "stats"],
    queryFn: dashboardApi.getStats,
  });

  const recentMedia = useQuery({
    queryKey: ["admin", "dashboard", "recent-media"],
    queryFn: dashboardApi.getRecentMedia,
  });

  return { stats, recentMedia };
}
