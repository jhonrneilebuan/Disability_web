import SavedJob from "../models/savedJob.model.js";

export const saveJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.userId;

  try {
    const existingSavedJob = await SavedJob.findOne({ userId, jobId });
    if (existingSavedJob) {
      return res.status(400).json({ message: "Job is already saved." });
    }

    const savedJob = new SavedJob({
      userId,
      jobId,
    });

    await savedJob.save();

    const savedJobWithDetails = await SavedJob.findById(savedJob._id).populate(
      "jobId"
    );

    res.status(201).json({
      message: "Job saved successfully!",
      savedJob: savedJobWithDetails,
    });
  } catch (error) {
    console.error("Error saving job:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({ userId: req.userId }).populate(
      "jobId"
    );
    res.status(200).json(savedJobs);
  } catch (error) {
    console.error("Error fetching saved jobs:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const unsaveJob = async (req, res) => {
  const { jobId } = req.body;  
  const userId = req.userId;    
  console.log("JobId", jobId)

  try {
    const savedJob = await SavedJob.findOne({
      userId: userId,   
      jobId: jobId,     
    });

    if (!savedJob) {
      return res.status(404).json({ message: "Job not found in saved jobs." });
    }

    await savedJob.deleteOne();

    res.status(200).json({ message: "Job removed from saved jobs." });
  } catch (error) {
    console.error("Error removing saved job:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
