import express from "express";
import { verifyToken, admin } from "../middlewares/token.js";
import {
  getAllUsers,
  deleteUserById,
  banUserById,
  unbanUserById,
  updateVerificationStatus,
  getUsersInfo,
  updateUserById,
  getTotalUsers,
  getTotalEmployers,
  getTotalApplicants
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/get-users", verifyToken, admin, getAllUsers);
router.delete("/user/:id", verifyToken, admin, deleteUserById);
router.patch("/user/:id/ban", verifyToken, admin, banUserById); 
router.patch("/user/:id/unban", verifyToken, admin, unbanUserById); 
router.patch("/update-verification-status", verifyToken, admin, updateVerificationStatus);
router.get("/users/info", verifyToken, admin, getUsersInfo); 
router.put("/users/:id", verifyToken, admin ,updateUserById);
router.get("/users/total", getTotalUsers);
router.get("/users/employers/total", getTotalEmployers);
router.get("/users/applicants/total", getTotalApplicants);


export default router;
