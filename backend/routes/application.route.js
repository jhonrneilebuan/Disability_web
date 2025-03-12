import express from "express";
import {
  acceptApplication,
  applyJobs,
  clearJobPreferences,
  completeInterview,
  confirmInterview,
  declineInterview,
  getApplicantsWithJobs,
  getApplications,
  getApplicationsByApplicant,
  getCompleteInterview,
  getCompleteInterviewedApplicants,
  getInterviewDetails,
  getInteviewedScheduledApplicants,
  getJobApplicantsCount,
  getJobPreferences,
  getShortlistedApplicants,
  getTotalApplicant,
  getTotalApplications,
  getTotalHired,
  getTotalInterview,
  getTotalPending,
  getTotalShortlist,
  hireApplication,
  interviewApplication,
  rejectApplication,
  requestReschedule,
  scheduleInterview,
  shortlistApplication,
  updateJobPreferences,
  withdrawApplication,
  countJobsByCategory,
  getJobsByCategory,
  JobsByDisability
} from "../controllers/application.controller.js";
import { uploadFiles } from "../middlewares/file_upload.js";
import { employerOnly, verifyToken } from "../middlewares/token.js";

const router = express.Router();

router.get("/count-by-category", countJobsByCategory);
router.get("/category/:category", getJobsByCategory);



router.post("/apply", verifyToken, uploadFiles, applyJobs);

router.get("/applications/:id", verifyToken, getApplications);
router.get(
  "/total-applications",
  verifyToken,
  employerOnly,
  getTotalApplications
);

router.delete("/withdraw-application/:id", verifyToken, withdrawApplication);
router.get("/my-applications", verifyToken, getApplicationsByApplicant);
router.get("/applicants", verifyToken, employerOnly, getApplicantsWithJobs);
router.patch("/:id/shortlist", verifyToken, employerOnly, shortlistApplication);
router.patch("/:id/interview", verifyToken, employerOnly, interviewApplication);
router.patch("/:id/acceptance", verifyToken, employerOnly, acceptApplication);
router.patch("/:id/hired", verifyToken, employerOnly, hireApplication);
router.patch("/:id/reject", verifyToken, employerOnly, rejectApplication);
router.patch("/:id/complete", verifyToken, employerOnly, completeInterview);
router.patch("/:id/confirm-interview", verifyToken, confirmInterview);
router.patch("/:id/decline-interview", verifyToken, declineInterview);
router.get("/shortlist", verifyToken, employerOnly, getShortlistedApplicants);
router.get(
  "/scheduled-interview",
  verifyToken,
  employerOnly,
  getInteviewedScheduledApplicants
);
router.get(
  "/complete-interview",
  verifyToken,
  employerOnly,
  getCompleteInterviewedApplicants
);
router.get("/total-pending", verifyToken, employerOnly, getTotalPending);
router.get("/total-shortlist", verifyToken, employerOnly, getTotalShortlist);
router.get("/total-interview", verifyToken, employerOnly, getTotalInterview);
router.get("/total-hired", verifyToken, employerOnly, getTotalHired);
router.get("/total-applicant", verifyToken, employerOnly, getTotalApplicant);
router.get(
  "/applicant-count",
  verifyToken,
  employerOnly,
  getJobApplicantsCount
);
router.get("/", verifyToken, getJobPreferences);
router.put("/", verifyToken, updateJobPreferences);
router.delete("/clear", verifyToken, clearJobPreferences);
router.get(
  "/applicant-count",
  verifyToken,
  employerOnly,
  getJobApplicantsCount
);
router.get("/", verifyToken, getJobPreferences);
router.put("/", verifyToken, updateJobPreferences);
router.delete("/clear", verifyToken, clearJobPreferences);
router.post(
  "/applications/:applicationId/schedule-interview",
  verifyToken,
  scheduleInterview
);

router.post(
  "/applications/:applicationId/request-reschedule",
  verifyToken,
  requestReschedule
);

router.get(
  "/applications/:applicationId/interview",
  verifyToken,
  getInterviewDetails
);

router.get("/applicants/CompleteInterview", verifyToken, getCompleteInterview);
router.get("/job-disability", verifyToken ,JobsByDisability);

export default router;
