import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { researchApi } from "../../services/researchApi";

const key = ["admin", "research"];

export function useResearch() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: key,
    queryFn: researchApi.getAll,
  });

  const create = useMutation({
    mutationFn: researchApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => researchApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const remove = useMutation({
    mutationFn: researchApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { list, create, update, remove };
}
