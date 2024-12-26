import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export const jobStore = create((set) => ({
  jobPosts: [],
  isLoading: false,
  error: null,
  message: null,

  getJobPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/jobs/`);
      set({
        jobPosts: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching job posts:", error);
      toast.error(error.response?.data?.message || "Error fetching job posts");
      set({
        error: error.response?.data?.message || "Error fetching job posts",
        isLoading: false,
      });
      throw error;
    }
  },

  createJobPost: async (jobData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/jobs/`, jobData);
      set({
        jobPosts: [...set.getState().jobPosts, response.data],
        isLoading: false,
      });
      toast.success("Job post created successfully");
    } catch (error) {
      console.error("Error creating job post:", error);
      toast.error(error.response?.data?.message || "Error creating job post");
      set({
        error: error.response?.data?.message || "Error creating job post",
        isLoading: false,
      });
      throw error;
    }
  },
}));
