import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/database.js";
import authRoutes from "./routes/auth.route.js"
import profileSettingsRoutes from "./routes/profileSettings.route.js"
import jobRoutes from "./routes/job.route.js"
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,  
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes)
app.use("/api/profilesettings", profileSettingsRoutes);
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
