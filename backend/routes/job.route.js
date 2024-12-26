import express from "express";
import { createJob, getAllJobs, getJobById } from "../controllers/job.controller.js";
import { verifyToken, employerOnly } from "../middlewares/token.js"; 

const router = express.Router();

router.post("/", verifyToken, employerOnly, createJob);

router.get("/", getAllJobs);

router.get("/:id", getJobById);

export default router;
