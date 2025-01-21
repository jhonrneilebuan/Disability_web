import express from "express";
import { updateProfile, updateCoverPhoto, userProfileInfo, updateEmployerProfile, uploadCertificates, uploadResume  } from "../controllers/profileSettings.controller.js";
import { uploadFiles } from "../middlewares/file_upload.js";
import { employerOnly, verifyToken } from "../middlewares/token.js";
const router = express.Router();

router.put("/update-profile", verifyToken, updateProfile);
router.put("/update-coverPhoto", verifyToken, updateCoverPhoto);
router.put('/user/resume', verifyToken, uploadFiles, uploadResume)
router.put('/user/certificates', verifyToken, uploadCertificates);
router.put('/user/profile', verifyToken, userProfileInfo);
router.put('/user/employer-profile', verifyToken, employerOnly, updateEmployerProfile);


export default router;
