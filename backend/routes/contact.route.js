import express from "express";
import { contactUs } from "../controllers/email.controller.js";
const router = express.Router();

router.post("/", contactUs);

export default router;