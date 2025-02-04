import express from "express";
import { uploadFiles } from "../middlewares/file_upload.js";
import { employerOnly, verifyToken } from "../middlewares/token.js";
import {
  applyJobs,
  getApplications,
  getApplicationsByApplicant,
  getTotalApplications,
  getApplicantsWithJobs,
  withdrawApplication,
  shortlistApplication,
  interviewApplication,
  acceptApplication,
  hireApplication,
  rejectApplication,
  getShortlistedApplicants,
  getTotalPending,
  getTotalShortlist,
  getTotalInterview,
  getTotalHired,
  getTotalApplicant,
  getJobApplicantsCount,
  getJobPreferences,
  updateJobPreferences
} from "../controllers/application.controller.js";

const router = express.Router();

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
router.get('/shortlist', verifyToken, employerOnly, getShortlistedApplicants);
router.get("/total-pending", verifyToken, employerOnly, getTotalPending);
router.get("/total-shortlist", verifyToken, employerOnly, getTotalShortlist);
router.get("/total-interview", verifyToken, employerOnly, getTotalInterview);
router.get("/total-hired", verifyToken, employerOnly, getTotalHired);
router.get("/total-applicant", verifyToken, employerOnly, getTotalApplicant);
router.get("/applicant-count", verifyToken, employerOnly, getJobApplicantsCount);
router.get("/", verifyToken, getJobPreferences);
router.put("/", verifyToken, updateJobPreferences);




export default router;
