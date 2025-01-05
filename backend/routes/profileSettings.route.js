import express from "express";
import { updateProfile, userProfileInfo, updateEmployerProfile  } from "../controllers/profileSettings.controller.js";
import { employerOnly, verifyToken } from "../middlewares/token.js";
const router = express.Router();

router.put("/update-profile", verifyToken, updateProfile);
router.put('/user/profile', verifyToken, userProfileInfo);
router.put('/user/employer-profile', verifyToken, employerOnly, updateEmployerProfile);


export default router;
