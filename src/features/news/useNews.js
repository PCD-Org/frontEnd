import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newsApi } from "../../services/newsApi";

const key = ["admin", "news"];

export function useNews() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: key,
    queryFn: newsApi.getAll,
  });

  const create = useMutation({
    mutationFn: newsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => newsApi.update(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const remove = useMutation({
    mutationFn: newsApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { list, create, update, remove };
}
