import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";

const endpoint = "/contact-inquiries";

const isMock = () => API_MODE === "mock";

let mockInquiries = [
  {
    id: "inquiry-1",
    name: "Mohammed",
    email: "test@example.com",
    message: "I would like more information about your environmental programs.",
    status: "new",
    createdAt: "2026-02-01T10:00:00.000Z",
  },
];

export const contactInquiriesApi = {
  // Public inquiry submission (no auth required)
  async create(payload) {
    if (isMock()) {
      const newInquiry = {
        id: `inquiry-${Date.now()}`,
        status: "new",
        createdAt: new Date().toISOString(),
        ...payload,
      };
      mockInquiries = [newInquiry, ...mockInquiries];
      return withDelay(newInquiry);
    }
    const { data } = await api.post(endpoint, payload);
    return data.data ?? data;
  },

  // Admin inquiries retrieval
  async getAll(params) {
    if (isMock()) {
      let result = [...mockInquiries];
      if (params?.status) {
        result = result.filter((item) => item.status === params.status);
      }
      return withDelay(result);
    }
    const { data } = await api.get(endpoint, { params });
    return data.data ?? data;
  },

  // Admin inquiry status update
  async updateStatus(id, statusOrPayload) {
    const payload =
      typeof statusOrPayload === "string"
        ? { status: statusOrPayload }
        : statusOrPayload;

    if (isMock()) {
      mockInquiries = mockInquiries.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      );
      return withDelay(mockInquiries.find((item) => item.id === id));
    }
    const { data } = await api.patch(`${endpoint}/${id}`, payload);
    return data.data ?? data;
  },
};
