import express from "express";
import {
  createJob,
  deleteJobById,
  getAllJobs,
  getEmployerJobs,
  getJobById,
} from "../controllers/job.controller.js";
import { verifyToken, employerOnly } from "../middlewares/token.js";

const router = express.Router();

router.post("/", verifyToken, employerOnly, createJob);

router.get("/", getAllJobs);

router.get("/post-job", verifyToken, employerOnly, getEmployerJobs);

router.get("/:id", getJobById);

router.delete("/:id", verifyToken, deleteJobById)

export default router;
