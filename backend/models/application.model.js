import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    coverLetter: {
      type: String,
      required: false,
    },
    resume: {
      type: String,
      required: true,
    },
    additionalFiles: [{ type: String }],
    accessibilityNeeds: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["Submitted", "Reviewed", "Shortlisted", "Rejected"],
      default: "Submitted",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
