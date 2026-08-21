import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../../services/dashboardApi";

export function useDashboard() {
  const summary = useQuery({
    queryKey: ["admin", "dashboard", "summary"],
    queryFn: () => dashboardApi.getSummary(),
  });

  return { summary };
}

