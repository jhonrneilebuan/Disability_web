import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../db/utils.js"

export const createAdminAccount = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@test.com" });
    if (!existingAdmin) {
      const newAdmin = new User({
        email: "admin@test.com",
        fullName: "Admin",
        password: await bcrypt.hash("admin", 10),
        role: "Admin",
        privacyAgreement: true,
        isVerified: true,
      });

      await newAdmin.save();
      console.log("Admin account created successfully");

      generateToken(newAdmin._id, res);
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error("Error in Creating Admin Account!:", error);
  }
};
