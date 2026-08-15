import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mediaApi } from "../../services/mediaApi";

const key = ["admin", "media"];

export function useMedia() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: key,
    queryFn: mediaApi.getAll,
  });

  const upload = useMutation({
    mutationFn: mediaApi.upload,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const remove = useMutation({
    mutationFn: mediaApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { list, upload, remove };
}
