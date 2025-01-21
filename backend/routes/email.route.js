import express from "express";
import { verifyToken } from "../middlewares/token.js";
import { sendEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, sendEmail);

export default router;