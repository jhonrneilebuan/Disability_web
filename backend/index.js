import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/database.js";
//import { createAdminAccount } from "./scripts/admin.js";

import authRoutes from "./routes/auth.route.js";
import profileSettingsRoutes from "./routes/profileSettings.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
import adminRoutes from "./routes/admin.route.js";
import SavedJobRoutes from "./routes/savedJob.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes  from "./routes/message.route.js";
import { app, server } from "./db/socket.js";


dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

//createAdminAccount();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profilesettings", profileSettingsRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/savedJobs", SavedJobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);




const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
