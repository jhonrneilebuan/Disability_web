import express from "express";
import {
  banUserById,
  deleteUserById,
  getAdminProfile,
  getAllUsers,
  getTotalApplicants,
  getTotalEmployers,
  getTotalUser,
  getTotalUsers,
  getUserPercentage,
  getUsersInfo,
  unbanUserById,
  updateAdminProfile,
  updateUserById,
  updateVerificationStatus,
  updateDisabilityVerificationStatus,
  updateEmployerVerificationStatus,
  getDisabilityVerificationId,
  getEmployerVerificationId,
  getPendingEmployerVerifications,
  getPendingDisabilityVerifications,
  getUploadedDisabilityVerificationIds,
  getUploadedEmployerVerificationIds,
  getAllDisabilityCounts,
  getAllEmployers,
  getTotaluser
} from "../controllers/admin.controller.js";
import { admin, verifyToken } from "../middlewares/token.js";

const router = express.Router();

router.get("/employers",  getAllEmployers);
router.get("/get-users", verifyToken, admin, getAllUsers);
router.delete("/user/:id", verifyToken, admin, deleteUserById);
router.patch("/user/:id/ban", verifyToken, admin, banUserById);
router.patch("/user/:id/unban", verifyToken, admin, unbanUserById);
router.patch(
  "/update-verification-status",
  verifyToken,
  admin,
  updateVerificationStatus
);
router.get("/users/info", verifyToken, admin, getUsersInfo);
router.put("/users/:id", verifyToken, admin, updateUserById);
router.get("/users/total", getTotalUsers);
router.get("/users/employers/total", getTotalEmployers);
router.get("/users/applicants/total", getTotalApplicants);
router.get("/total-users", verifyToken, admin, getTotalUser);

router.get("/total-user", verifyToken, admin,getTotaluser);

router.get("/user-percentage", verifyToken, admin, getUserPercentage);
router.put("/update-profile", verifyToken, admin, updateAdminProfile);
router.get("/profile", verifyToken, admin, getAdminProfile);

router.get("/disability-id/all", getUploadedDisabilityVerificationIds); 
router.get("/disability-id/all-employer", getUploadedEmployerVerificationIds); 

router.get("/disability-id/:userId", getDisabilityVerificationId); 
router.put("/disability-verify/:userId", updateDisabilityVerificationStatus); 

router.get("/employer-id/:userId", getEmployerVerificationId); 
router.put("/employer-verify/:userId", updateEmployerVerificationStatus);
router.get("/pending-pwdID", verifyToken, admin, getPendingDisabilityVerifications);
router.get("/pending-employerID", verifyToken, admin, getPendingEmployerVerifications);

router.get("/disability-counts", getAllDisabilityCounts);

export default router;
