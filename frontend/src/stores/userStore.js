import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export const userStore = create((set, get) => ({
  isLoading: false,
  error: null,
  users: [],

  searchUsers: async (fullName) => {
    if (!fullName.trim()) {
      set({ error: "Full name is required", users: [] });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/users/search`, {
        params: { fullName },
      });

      set({ users: response.data, isLoading: false });
    } catch (error) {
      console.error("Error searching users:", error);
      set({
        error: error.response?.data?.message || "Something went wrong",
        users: [],
        isLoading: false,
      });
    }
  },

  fetchUserData: async (userId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      set({
        profileData: response.data,  
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      set({
        error: "Failed to load user data",
        isLoading: false,
      });
    }
  },
}));
