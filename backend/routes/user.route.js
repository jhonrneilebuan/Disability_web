import express from "express";
import { searchUsers, fetchUserData } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/:userId", fetchUserData)

export default router;
