import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactInquiriesApi } from "../../services/contactInquiriesApi";

export const INQUIRIES_QUERY_KEY = ["admin", "contact-inquiries"];

export function useContactInquiries(params) {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: params ? [...INQUIRIES_QUERY_KEY, params] : INQUIRIES_QUERY_KEY,
    queryFn: () => contactInquiriesApi.getAll(params),
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }) => contactInquiriesApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INQUIRIES_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });

  return { list, updateStatus };
}
