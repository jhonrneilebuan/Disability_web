import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No Token Provided" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.error(`Error in verifyToken middleware: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const employerOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    if (user.role === "Employer") {
      next();
    } else {
      res.status(403).json({ message: "Access denied, employers only" });
    }
  } catch (error) {
    console.error(`Error in employerOnly middleware: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("role");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    if (user.role === "Admin") {
      next();
    } else {
      res.status(403).json({ message: "Access denied, admin only" });
    }
  } catch (error) {
    console.error(`Error in Admin middleware: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
