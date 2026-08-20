import api from "../utils/api";
import { API_MODE } from "../utils/api";
import { withDelay } from "../utils/mock";

const endpoint = "/admins";

const isMock = () => API_MODE === "mock";

const mockAdmins = [
  {
    id: "admin-1",
    email: "superadmin@example.com",
    role: "superadmin",
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

export const adminsApi = {
  async getAll(params) {
    if (isMock()) return withDelay([...mockAdmins]);
    const { data } = await api.get(endpoint, { params });
    return data.data ?? data;
  },

  async getById(id) {
    if (isMock()) {
      const admin = mockAdmins.find((a) => a.id === id);
      return withDelay(admin || null);
    }
    const { data } = await api.get(`${endpoint}/${id}`);
    return data.data ?? data;
  },

  async create(payload) {
    if (isMock()) {
      const newAdmin = {
        id: `admin-${Date.now()}`,
        email: payload.email,
        role: payload.role || "admin",
        createdAt: new Date().toISOString(),
      };
      mockAdmins.push(newAdmin);
      return withDelay(newAdmin);
    }
    const { data } = await api.post(endpoint, payload);
    return data.data ?? data;
  },
};
