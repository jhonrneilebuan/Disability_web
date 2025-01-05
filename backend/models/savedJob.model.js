import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SavedJob = mongoose.model("SavedJob", SavedJobSchema);

export default SavedJob;
