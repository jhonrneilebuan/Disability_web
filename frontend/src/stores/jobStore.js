import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export const jobStore = create((set, get) => ({
  jobPosts: [],
  applications: [],
  employerApplicants: [],
  totalApplicants: 0,
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

  deleteJobPost: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(`${API_URL}/jobs/${jobId}`);
      set({
        jobPosts: get().jobPosts.filter((job) => job._id !== jobId),
        isLoading: false,
      });
      toast.success(
        response.data.message || "Job has been deleted successfully"
      );
    } catch (error) {
      console.error("Error deleting job post:", error);
      toast.error(error.response?.data?.message || "Error deleting job post");
      set({
        error: error.response?.data?.message || "Error deleting job post",
        isLoading: false,
      });
      throw error;
    }
  },

  getApplicationsByApplicant: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/applications/my-applications`
      );
      set({
        applications: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error(
        error.response?.data?.message || "Error fetching applications"
      );
      set({
        error: error.response?.data?.message || "Error fetching applications",
        isLoading: false,
      });
      throw error;
    }
  },

  getEmployerJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/jobs/post-job`);
      set({ jobPosts: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching job posts for employer:", error);
      toast.error(error.response?.data?.message || "Error fetching job posts");
      set({
        error: error.response?.data?.message || "Error fetching job posts",
        isLoading: false,
      });
      throw error;
    }
  },

  getTotalApplications: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_URL}/applications/total-applications`
      );
      const totalApplicants = response.data.totalApplicants || 0;
      set({
        totalApplicants: totalApplicants,
        applications: response.data.applications,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total applications:", error);
      set({ error: error.response?.data?.message, isLoading: false });
    }
  },

  getEmployerApplicants: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/applications/applicants`);
      console.log("Applicants fetched:", response.data); 
      set({
        employerApplicants: response.data,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching applicants:", error);
      toast.error(error.response?.data?.message || "Error fetching applicants");
      set({
        error: error.response?.data?.message || "Error fetching applicants",
        isLoading: false,
      });
    }
  },
}));
