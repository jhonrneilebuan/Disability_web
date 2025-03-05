import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    user: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", required: true 
    },
    message: 
    { 
        type: String, 
        required: true 
    },
    type: 
    { 
        type: String,
        required: true 
    },
    userRole: { 
      type: String,
      enum: ["Employer", "Applicant"],
      required: true
    },
    isRead: 
    { 
        type: Boolean, 
        default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
