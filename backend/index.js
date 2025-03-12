import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";



import { corsOptions } from "./config/cors.config.js";
import { connectDB } from "./db/database.js";
//import { createAdminAccount } from "./scripts/admin.js";

import { app, server } from "./db/socket.js";
import adminRoutes from "./routes/admin.route.js";
import applicationRoutes from "./routes/application.route.js";
import authRoutes from "./routes/auth.route.js";
import jobRoutes from "./routes/job.route.js";
import messageRoutes from "./routes/message.route.js";
import profileSettingsRoutes from "./routes/profileSettings.route.js";
import SavedJobRoutes from "./routes/savedJob.js";
import userRoutes from "./routes/user.route.js";
import emailRoutes from "./routes/email.route.js"
import notificationRoutes from "./routes/notification.route.js"
import contactRoutes from "./routes/contact.route.js"
dotenv.config();
app.use(cors(corsOptions));

app.use("/uploads", express.static("uploads"));
//createAdminAccount();

app.use(express.json({
  limit: '50mb'
}));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/profilesettings", profileSettingsRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/savedJobs", SavedJobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/contact", contactRoutes);


const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectDB();
});
