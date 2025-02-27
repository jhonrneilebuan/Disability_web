import express from "express";
import {
  getNotifications,
  markAllNotificationsAsRead,
} from "../controllers/notification.controller.js";
import { verifyToken } from "../middlewares/token.js";
const router = express.Router();

router.get("/notify", verifyToken, getNotifications);
router.patch("/mark-all-read", verifyToken, markAllNotificationsAsRead);

export default router;
