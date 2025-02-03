import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = "http://localhost:8080/api";

axios.defaults.withCredentials = true;

export const jobStore = create((set, get) => ({
  jobDetails: null,
  jobPosts: [],
  applications: [],
  employerApplicants: [],
  totalApplicantCount: [],
  savedJobs: [],
  totalPending: 0,
  totalDataOfApplicants: null,
  totalShortlist: 0,
  totalInterview: 0,
  totalHired: 0,
  totalApplicants: 0,
  totalJobs: 0,
  isLoading: false,
  isTotalLoading: false,
  isChartLoading: false,
  error: null,
  message: null,

  getTotalApplicant: async () => {
    set({ isTotalLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/applications/total-applicant`);
      set({
        totalDataOfApplicants: response.data, 
        isTotalLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total applicants:", error);
      toast.error(error.response?.data?.message || "Error fetching total applicants");
      set({
        error: error.response?.data?.message || "Error fetching total applicants",
        isTotalLoading: false,
      });
    }
  }, 

  getJobApplicantsCount: async () => {
    set({ isChartLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/applications/applicant-count`);
      set({
        totalApplicantCount: response.data, 
        isChartLoading: false,
      });
    } catch (error) {
      console.error("Error fetching job applicants count:", error);
      toast.error(error.response?.data?.message || "Error fetching job applicants count");
      set({
        error: error.response?.data?.message || "Error fetching job applicants count",
        isChartLoading: false,
      });
    }
  },
  

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

  getJobById: async (jobId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/jobs/${jobId}`);
      set({
        jobDetails: response.data,
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

  getTotalJobs: async () => {
    set({ isTotalLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/jobs/total-job`);
      const totalJobs = response.data.totalJobs || 0;
      set({
        totalJobs,
        isTotalLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total jobs:", error);
      set({ error: error.response?.data?.message, isTotalLoading: false });
    }
  },

  getTotalPending: async () => {
    set({ isTotalLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/applications/total-pending`);
      const totalPending = response.data.totalPending || 0;
      set({
        totalPending,
        isTotalLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total pending:", error);
      set({ error: error.response?.data?.message, isTotalLoading: false });
    }
  },

  getTotalShortlist: async () => {
    set({ isTotalLoading: true, error: null });

    try {
      const response = await axios.get(
        `${API_URL}/applications/total-shortlist`
      );
      const totalShortlist = response.data.totalShortlist || 0;
      set({
        totalShortlist,
        isTotalLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total shortlist:", error);
      set({ error: error.response?.data?.message, isTotalLoading: false });
    }
  },

  getTotalInterview: async () => {
    set({ isTotalLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_URL}/applications/total-interview`
      );
      const totalInterview = response.data.totalInterview || 0;
      set({
        totalInterview,
        isTotalLoading: false,
      });
    } catch (error) {
      console.error("Error fetching total interview:", error);
      set({ error: error.response?.data?.message, isTotalLoading: false });
    }
  },

  getTotalHired: async () => {
    set({ isTotalLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/applications/total-hired`);
      const totalHired = response.data.totalHired || 0;
      set({ totalHired, isTotalLoading: false });
    } catch (error) {
      console.error("Error in fetching total hired", error);
      set({ error: error.response?.data?.message, isTotalLoading: false });
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

  withdrawApplication: async (applicationId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.delete(
        `${API_URL}/applications/withdraw-application/${applicationId}`
      );
      set({
        applications: get().applications.filter(
          (app) => app._id !== applicationId
        ),
        isLoading: false,
      });
      toast.success(
        response.data.message || "Application withdrawn successfully."
      );
    } catch (error) {
      console.error("Error withdrawing application:", error);
      toast.error(
        error.response?.data?.message || "Error withdrawing application."
      );
      set({
        error:
          error.response?.data?.message || "Error withdrawing application.",
        isLoading: false,
      });
      throw error;
    }
  },

  getSavedJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/savedJobs/saved`);
      console.log(response.data);
      set({ savedJobs: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      set({ error: error.message, isLoading: false });
      toast.error("Failed to fetch saved jobs.");
    }
  },

  saveJob: async (jobId) => {
    try {
      const response = await axios.post(
        `${API_URL}/savedJobs/save`,
        { jobId },
        { withCredentials: true }
      );

      toast.success(response.data.message);

      get().getSavedJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job.");
    }
  },

  unsaveJob: async (savedJobId) => {
    try {
      const savedJobs = get().savedJobs;

      console.log("Saved Jobs:", savedJobs);
      console.log("Looking for Job ID:", savedJobId);

      const job = savedJobs.find((job) => job._id === savedJobId);

      if (!job) {
        console.error("Job not found in saved jobs.");
        return;
      }

      const jobId = job.jobId?._id || job.jobId;

      console.log("Extracted Job ID:", jobId);

      if (!jobId) {
        console.error("Job ID is missing.");
        return;
      }

      const response = await axios.delete(`${API_URL}/savedJobs/unsave`, {
        data: { jobId },
      });

      console.log(response.data.message);

      set((state) => ({
        savedJobs: state.savedJobs.filter((job) => job._id !== savedJobId),
      }));
    } catch (error) {
      console.error("Error removing saved job:", error.message);
      alert("Failed to remove job from saved list. Please try again.");
    }
  },

  shortlistApplication: async (applicationId) => {
    if (!applicationId) {
      console.error("Application ID is missing");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        `${API_URL}/applications/${applicationId}/shortlist`
      );

      set((state) => ({
        employerApplicants: state.employerApplicants.map((applicant) =>
          applicant._id === applicationId
            ? { ...applicant, status: "Shortlisted" }
            : applicant
        ),
        isLoading: false,
      }));

      toast.success(
        response.data.message || "Application shortlisted successfully."
      );
    } catch (error) {
      console.error("Error shortlisting application:", error);
      toast.error(
        error.response?.data?.message || "Failed to shortlist the application."
      );
      set({
        error:
          error.response?.data?.message || "Error shortlisting application",
        isLoading: false,
      });
      throw error;
    }
  },

  rejectApplication: async (applicationId) => {
    if (!applicationId) {
      console.error("Application ID is missing");
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        `${API_URL}/applications/${applicationId}/reject`
      );

      set((state) => ({
        employerApplicants: state.employerApplicants.map((applicant) =>
          applicant._id === applicationId
            ? { ...applicant, status: "Rejected" }
            : applicant
        ),
        isLoading: false,
      }));

      toast.success(
        response.data.message || "Application rejected successfully."
      );
    } catch (error) {
      console.error("Error rejecting application:", error);
      toast.error(
        error.response?.data?.message || "Failed to reject the application."
      );
      set({
        error: error.response?.data?.message || "Error rejecting application",
        isLoading: false,
      });
      throw error;
    }
  },

  applyJobs: async ({
    jobId,
    coverLetter,
    accessibilityNeeds,
    resume,
    additionalFiles,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("coverLetter", coverLetter);
      formData.append("accessibilityNeeds", accessibilityNeeds);

      if (resume) {
        formData.append("resume", resume);
      }

      if (additionalFiles && additionalFiles.length > 0) {
        additionalFiles.forEach((file) => {
          formData.append("additionalFiles", file);
        });
      }

      const response = await axios.post(
        `${API_URL}/applications/apply`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(
        response.data.message || "Application submitted successfully."
      );
      set({
        message: response.data.message || "Application submitted successfully.",
        isLoading: false,
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw new Error("You have already applied for this job.");
      } else {
        console.error("Error applying for job:", error);
        toast.error(error.response?.data?.error || "Error applying for job");
        set({
          error: error.response?.data?.error || "Error applying for job",
          isLoading: false,
        });
        throw error;
      }
    }
  },

  createJob: async ({
    companyName,
    applicationDeadline,
    jobTitle,
    jobDescription,
    jobCategory,
    locations,
    preferredLanguage,
    jobQualifications,
    jobExperience,
    jobType,
    jobShift,
    jobLevel,
    applyWithLink,
    jobSkills,
    expectedSalary,
    jobAttachment,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();

      formData.append("companyName", companyName);
      formData.append("applicationDeadline", applicationDeadline);
      formData.append("jobTitle", jobTitle);
      formData.append("jobDescription", jobDescription);
      formData.append("jobCategory", jobCategory);
      formData.append("preferredLanguage", preferredLanguage);
      formData.append("jobQualifications", jobQualifications);
      formData.append("jobExperience", jobExperience);
      formData.append("jobType", jobType);
      formData.append("jobShift", jobShift);
      formData.append("jobLevel", jobLevel);
      formData.append("applyWithLink", applyWithLink);

      if (locations) {
        formData.append("locations", JSON.stringify(locations));
      }
      if (jobSkills) {
        formData.append("jobSkills", JSON.stringify(jobSkills));
      }

      if (expectedSalary) {
        formData.append("expectedSalary", JSON.stringify(expectedSalary));
      }

      if (jobAttachment) {
        formData.append("jobAttachment", jobAttachment);
      }

      const response = await axios.post(`${API_URL}/jobs/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Job created successfully.");
      set({
        message: response.data.message || "Job created successfully.",
        isLoading: false,
      });
    } catch (error) {
      console.error("Error creating job:", error);

      toast.error(error.response?.data?.message || "Error creating job");
      set({
        error: error.response?.data?.message || "Error creating job",
        isLoading: false,
      });

      throw error;
    }
  },
}));
