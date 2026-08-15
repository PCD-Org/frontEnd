import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { activitiesApi } from "../../services/activitiesApi";

const key = ["admin", "activities"];

export function useActivities() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: key,
    queryFn: activitiesApi.getAll,
  });

  const create = useMutation({
    mutationFn: activitiesApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => activitiesApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const remove = useMutation({
    mutationFn: activitiesApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { list, create, update, remove };
}
