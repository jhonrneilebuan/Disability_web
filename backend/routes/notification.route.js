import express from "express";
import { verifyToken } from "../middlewares/token.js";
import { getNotifications } from "../controllers/notification.controller.js";
const router = express.Router();

router.get("/notify", verifyToken, getNotifications );

export default router;