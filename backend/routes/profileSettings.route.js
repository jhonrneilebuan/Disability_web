import express from "express";
import { updateProfile, userProfileInfo } from "../controllers/profileSettings.controller.js";
import { verifyToken } from "../middlewares/token.js";
const router = express.Router();

router.put("/update-profile", verifyToken, updateProfile);
router.put('/user/profile', verifyToken, userProfileInfo);

export default router;
