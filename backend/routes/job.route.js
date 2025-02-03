import express from "express";
import {
  createJob,
  deleteJobById,
  getAllJobs,
  getEmployerJobs,
  getJobById,
  getTotalJobs
} from "../controllers/job.controller.js";
import { verifyToken, employerOnly } from "../middlewares/token.js";
import { uploadFiles } from "../middlewares/file_upload.js";

const router = express.Router();

router.post("/", verifyToken, employerOnly, uploadFiles, createJob);

router.get("/", getAllJobs);

router.get(
  "/total-job",
  verifyToken,
  employerOnly,
  getTotalJobs
);

router.get("/post-job", verifyToken, employerOnly, getEmployerJobs);

router.get("/:id", getJobById);

router.delete("/:id", verifyToken, deleteJobById)

export default router;
