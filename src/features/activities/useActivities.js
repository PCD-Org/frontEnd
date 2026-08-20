import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activitiesApi } from "../../services/activitiesApi";

export const ACTIVITIES_QUERY_KEY = ["activities"];

export function useActivities(params) {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: params ? [...ACTIVITIES_QUERY_KEY, params] : ACTIVITIES_QUERY_KEY,
    queryFn: () => activitiesApi.getAll(params),
  });

  const create = useMutation({
    mutationFn: activitiesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "activities"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => activitiesApi.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "activities"] });
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: [...ACTIVITIES_QUERY_KEY, variables.id] });
      }
    },
  });

  const remove = useMutation({
    mutationFn: activitiesApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVITIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "activities"] });
    },
  });

  return { list, create, update, remove };
}

export function useActivity(id) {
  return useQuery({
    queryKey: [...ACTIVITIES_QUERY_KEY, id],
    queryFn: () => activitiesApi.getById(id),
    enabled: Boolean(id),
  });
}
