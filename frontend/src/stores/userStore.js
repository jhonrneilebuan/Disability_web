import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export const userStore = create((set) => ({
  isLoading: false,
  error: null,
  users: [],
  isuploadDisabilityId: false,
  isuploadEmployerId: false,

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

  uploadDisabilityId: async (data) => {
    set({ isuploadDisabilityId: true });
    try {
      const response = await axios.put(
        `${API_URL}/profilesettings/upload-disabilityId`,
        data
      );
      set({ user: response.data });
      toast.success("Disability ID updated successfully");
    } catch (error) {
      console.log("error in Disability ID:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isuploadDisabilityId: false });
    }
  },
  uploadEmployerId: async (data) => {
    set({ isuploadEmployerId: true });
    try {
      const response = await axios.put(
        `${API_URL}/profilesettings/upload-employerId`,
        data
      );
      set({ user: response.data });
      toast.success("Employer ID updated successfully");
    } catch (error) {
      console.log("error in Employer ID:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isuploadEmployerId: false });
    }
  },
}));
