import express from "express";
import multer from "multer";
import { employerOnly, verifyToken } from "../middlewares/token.js";
import {
  applyJobs,
  getApplications,
  getApplicationsByApplicant,
  getTotalApplications,
  getApplicantsWithJobs,
} from "../controllers/application.controller.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post(
  "/apply",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalFiles", maxCount: 5 },
  ]),
  applyJobs
);

router.get("/applications/:id", verifyToken, getApplications);
router.get(
  "/total-applications",
  verifyToken,
  employerOnly,
  getTotalApplications
);

router.get("/my-applications", verifyToken, getApplicationsByApplicant);

router.get("/applicants", verifyToken, employerOnly, getApplicantsWithJobs);

export default router;
