// adminApi.js
import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:8080/api/admin";

axios.defaults.withCredentials = true;
export const adminStore = create((set) => ({
  isAdminLoading: false,
  error: null,
  totalUsers: 0,
  totalEmployers: 0,

  getTotalUsers: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/users/total`);
      const totalUsers = response.data.totalUsers || 0;
      set({
        totalUsers: totalUsers,
        isAdminLoading: false,
      });
      console.log("Total Users:", response.data); // Log the response
    } catch (error) {
      console.error("Error fetching total users:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total users"
      );
      set({
        error: error.response?.data?.message || "Error fetching total users",
        isAdminLoading: false,
      });
    }
  },

  // getTotalEmployers: async () => {
  //   set({ isAdminLoading: true, error: null });
  //   try {
  //     const response = await axios.get(`${BASE_URL}/users/employers/total`);
  //     const totalEmployers = response.data.totalEmployers || 0
  //     set({
  //       totalEmployers: totalEmployers,
  //       isAdminLoading: false,
  //     });
  //     console.log("Total Employers:", response.data); // Log the response
  //   } catch (error) {
  //     console.error("Error fetching total Employers:", error);
  //     toast.error(
  //       error.response?.data?.message || "Error fetching total employers"
  //     );
  //     set({
  //       error: error.response?.data?.message || "Error fetching total employers",
  //       isAdminLoading: false,
  //     });
  //   }
  // },

  getTotalEmployers: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/users/employers/total`);
      const totalEmployers = response.data.totalEmployers || 0;
      set({
        totalEmployers: totalEmployers,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total Employers:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total employers"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching total employers",
        isAdminLoading: false,
      });
    }
  },

  getTotalApplicants: async () => {
    set({ isAdminLoading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/users/applicants/total`);
      const totalApplicants = response.data.totalApplicants || 0;
      set({
        totalApplicants: totalApplicants,
        isAdminLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total Applicants:", error);
      toast.error(
        error.response?.data?.message || "Error fetching total applicants"
      );
      set({
        error:
          error.response?.data?.message || "Error fetching total applicants",
        isAdminLoading: false,
      });
    }
  },
}));

// Retrieve the admin token (assumed to be stored in localStorage after login)
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

/**
 * Fetch users data from the backend.
 * Expected response shape: { employers: [...], applicants: [...] }
 */
export const fetchUsersApi = () => {
  return axios.get(`${BASE_URL}/get-users`, { headers });
};

/**
 * Delete a user by ID.
 */
export const deleteUserApi = (userId) => {
  return axios.delete(`${BASE_URL}/user/${userId}`, { headers });
};

/**
 * Ban a user by ID.
 */
export const banUserApi = (userId) => {
  return axios.patch(`${BASE_URL}/user/${userId}/ban`, {}, { headers });
};

/**
 * Unban a user by ID.
 */
export const unbanUserApi = (userId) => {
  return axios.patch(`${BASE_URL}/user/${userId}/unban`, {}, { headers });
};

/**
 * Update a user's full name by ID.
 */
export const updateUserApi = (userId, newFullName) => {
  return axios.put(
    `${BASE_URL}/users/${userId}`,
    { fullName: newFullName },
    { headers }
  );
};
