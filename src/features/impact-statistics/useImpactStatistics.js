import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { impactStatisticsApi } from "../../services/impactStatisticsApi";

export const IMPACT_STATS_QUERY_KEY = ["admin", "impact-statistics"];

export function useImpactStatistics() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: IMPACT_STATS_QUERY_KEY,
    queryFn: impactStatisticsApi.getAll,
  });

  const create = useMutation({
    mutationFn: impactStatisticsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMPACT_STATS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => impactStatisticsApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMPACT_STATS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });

  const remove = useMutation({
    mutationFn: impactStatisticsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMPACT_STATS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });

  return { list, create, update, remove };
}
