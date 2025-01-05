import express from "express";
import multer from "multer";
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
  rejectApplication,
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
router.patch("/:id/reject", verifyToken, employerOnly, rejectApplication);

export default router;
