import axios from "axios";

// base URL can be configured via environment variable, default to backend port 5000
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// create an axios instance with credentials support so that refresh token cookie is sent
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// attach access token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor handles 401 by trying a token refresh once
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.__isRetryRequest
    ) {
      try {
        // call refresh endpoint directly using axios so we don't get into loop
        const refreshResp = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResp.data.accessToken;
        localStorage.setItem("token", newToken);
        originalRequest.__isRetryRequest = true;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // logout user on refresh failure
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// helper objects for each group of endpoints
export const authApi = {
  login: ({ email, password }) => api.post("/auth/login", { email, password }),
  register: ({ name, email, password }) => api.post("/auth/register", { name, email, password }),
  logout: () => api.post("/auth/logout"),
  refresh: () => api.post("/auth/refresh"),
};

export const complaintApi = {
  create: (formData) => api.post("/complaints", formData, { headers: { "Content-Type": "multipart/form-data" } }),
  getMy: () => api.get("/complaints/my"),
  getAssigned: () => api.get("/complaints/assigned"),
  updateStatus: (id, status) => api.put(`/complaints/${id}/status`, { status }),
};

export const adminApi = {
  createOfficer: (data) => api.post("/admin/create-officer", data),
  assignOfficer: (data) => api.post("/admin/assign-officer", data),
  getComplaints: () => api.get("/admin/complaints"),
  getOfficers: () => api.get("/admin/officers"),
};

export default api;
