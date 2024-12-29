import express from "express";
import { verifyToken, admin } from "../middlewares/token.js";
import {
  getAllUsers,
  deleteUserById,
  banUserById,
  unbanUserById,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/get-users", verifyToken, admin, getAllUsers);
router.delete("/user/:id", admin, verifyToken, deleteUserById);
router.put("/user/ban/:id", admin, verifyToken, banUserById);
router.put("/users/unban/:id", admin, verifyToken, unbanUserById);

export default router;
