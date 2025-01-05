import express from "express";
import {saveJob, getSavedJobs, unsaveJob} from "../controllers/savedJob.controller.js"
import {verifyToken} from "../middlewares/token.js"
const router = express.Router();

router.get("/saved", verifyToken, getSavedJobs);
router.post("/save", verifyToken, saveJob);
router.delete("/unsave", verifyToken, unsaveJob);

export default router;