import { sendConfirmationEmail } from "../mailtrap/gmail.js";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { io, getReceiverSocketId } from "../db/socket.js";

export const applyJobs = async (req, res) => {
  try {
    const applicantId = req.userId;
    const { jobId, coverLetter, accessibilityNeeds } = req.body;

    if (!jobId || !applicantId) {
      return res
        .status(400)
        .json({ error: "Job ID and applicant ID are required." });
    }

    if (!req.files || !req.files.resume) {
      return res.status(400).json({ error: "Resume is required." });
    }

    const job = await Job.findById(jobId).populate("employer"); 
    if (!job) {
      return res.status(404).json({ error: "Job not found." });
    }
    const employerId = job.employer._id; 

    const applicant = await User.findById(applicantId);
    if (!applicant) {
      return res.status(404).json({ error: "Applicant not found." });
    }

    const applicantDisability = applicant.disabilityInformation?.disabilityType;

    if (!applicantDisability) {
      return res
        .status(400)
        .json({ error: "Applicant disability information is required." });
    }

    if (!job.preferredDisabilities.includes("Any")) {
      const isEligible = job.preferredDisabilities.includes(applicantDisability);

      if (!isEligible) {
        return res.status(403).json({
          error: "You do not meet the preferred disability criteria for this job.",
        });
      }
    }

    const resumePath = req.files.resume ? req.files.resume[0].path : null;
    const additionalFilesPaths = req.files.additionalFiles
      ? req.files.additionalFiles.map((file) => file.path)
      : [];

    const existingApplication = await Application.findOne({
      jobId,
      applicantId,
    });

    if (existingApplication) {
      return res
        .status(409)
        .json({ error: "You have already applied for this job." });
    }

    const application = new Application({
      jobId,
      applicantId,
      coverLetter,
      resume: resumePath,
      additionalFiles: additionalFilesPaths,
      accessibilityNeeds,
    });

    await application.save();
    await sendConfirmationEmail(applicantId, jobId);

    const notification = new Notification({
      user: employerId,
      message: `A new applicant has applied for your job post: ${job.jobTitle}.`,
      type: "newJobApplication",
      isRead: false,
    });
    await notification.save(); 

    const employerSocketId = getReceiverSocketId(employerId.toString());
    console.log(`Employer Socket ID:`, employerSocketId);
    if (employerSocketId) {
      io.to(employerSocketId).emit("newJobApplication", {
        message: notification.message,
        jobId: job._id,
        applicantId,
      });
    } else {
      console.log(`Employer ${employerId} is offline. Notification saved.`);
    }

    res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error during application submission:", error);
    res.status(500).json({
      error: "An error occurred while submitting the application.",
    });
  }
};


export const getApplications = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const employerId = req.userId;

    const job = await Job.findOne({ _id: jobId, employer: employerId });

    if (!job) {
      return res.status(403).json({
        message: "You are not authorized to view this job's applications.",
      });
    }

    const applications = await Application.find({ jobId }).populate(
      "applicantId"
    );

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found." });
    }

    return res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching applications." });
  }
};

export const getApplicationsByApplicant = async (req, res) => {
  try {
    const applicantId = req.userId;

    if (!applicantId) {
      return res.status(400).json({ error: "Applicant ID is required." });
    }

    const applications = await Application.find({ applicantId }).populate(
      "jobId"
    );

    if (applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this applicant." });
    }

    res.status(200).json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching applications." });
  }
};

export const getTotalApplications = async (req, res) => {
  try {
    const employerId = req.userId;

    const jobs = await Job.find({ employer: employerId });

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      jobId: { $in: jobIds },
    }).populate("applicantId");

    const totalApplicants = applications.length;

    if (totalApplicants === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for your jobs." });
    }

    return res.status(200).json({
      totalApplicants,
      applications,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return res.status(500).json({
      error: "An error occurred while fetching applications.",
    });
  }
};

export const withdrawApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;
    const applicantId = req.userId;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    if (application.applicantId.toString() !== applicantId) {
      return res
        .status(403)
        .json({ error: "You can only withdraw your own applications." });
    }

    await application.deleteOne();

    res.status(200).json({ message: "Application withdrawn successfully." });
  } catch (error) {
    console.error("Error during application withdrawal:", error);
    res
      .status(500)
      .json({ error: "An error occurred while withdrawing the application." });
  }
};

export const getApplicantsWithJobs = async (req, res) => {
  try {
    const employerId = req.userId;

    const employerJobs = await Job.find({ employer: employerId });

    if (!employerJobs.length) {
      return res
        .status(403)
        .json({ message: "No jobs found for this employer" });
    }

    const applicants = await Application.find({
      jobId: { $in: employerJobs.map((job) => job._id) },
    })
      .populate("jobId", "jobTitle jobCategory jobType")
      .populate("applicantId", "fullName profilePicture")
      .select(
        "applicantId jobId createdAt status coverLetter resume additionalFiles accessibilityNeeds"
      )
      .exec();

    if (!applicants.length) {
      return res
        .status(404)
        .json({ message: "No applicants found for your jobs" });
    }

    const ApplicantsInfo = applicants.map((applicant) => ({
      id: applicant._id,
      applicantName: applicant.applicantId
        ? applicant.applicantId.fullName
        : "No name provided",
      applicantProfilePicture: applicant.applicantId
        ? applicant.applicantId.profilePicture || "No profile picture available"
        : "No profile picture available",
      jobTitle: applicant.jobId.jobTitle,
      jobCategory: applicant.jobId.jobCategory,
      jobType: applicant.jobId.jobType,
      appliedAt: applicant.createdAt,
      status: applicant.status,
      coverLetter: applicant.coverLetter || "No cover letter provided",
      resume: applicant.resume,
      additionalFiles: applicant.additionalFiles || [],
      accessibilityNeeds: applicant.accessibilityNeeds || "None",
    }));

    res.status(200).json(ApplicantsInfo);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const shortlistApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;
    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    const applicantId = application.applicantId; 

    application.status = "Shortlisted";
    await application.save();

    const notification = new Notification({
      user: applicantId,
      message: `Your job application has been shortlisted!`,
      type: "applicationShortlisted",
      isRead: false,
    });
    await notification.save();

    const applicantSocketId = getReceiverSocketId(applicantId.toString());

    if (applicantSocketId) {
      io.to(applicantSocketId).emit("applicationShortlisted", {
        message: notification.message,
        applicationId: application._id,
        status: "Shortlisted",
      });
    } else {
      console.log(`Applicant ${applicantId} is offline. Notification saved.`);
    }

    res.status(200).json({
      message: "Application successfully shortlisted.",
      application,
    });
  } catch (error) {
    console.error("Error shortlisting application:", error);
    res.status(500).json({
      error: "An error occurred while shortlisting the application.",
    });
  }
};



export const interviewApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    application.status = "Interview";
    await application.save();

    res.status(200).json({
      message: "Application successfully moved to the interview stage.",
      application,
    });
  } catch (error) {
    console.error("Error updating application to interview stage:", error);
    res.status(500).json({
      error:
        "An error occurred while updating the application status to interview.",
    });
  }
};

export const acceptApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    application.status = "Acceptance";
    await application.save();

    res.status(200).json({
      message: "Application successfully moved to acceptance stage.",
      application,
    });
  } catch (error) {
    console.error("Error updating application to acceptance stage:", error);
    res.status(500).json({
      error:
        "An error occurred while updating the application status to acceptance.",
    });
  }
};

export const hireApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;

    if (!applicationId) {
      return res.status(400).json({ error: "Application ID is required." });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    application.status = "Hired";
    await application.save();

    res.status(200).json({
      message: "Application successfully moved to hired stage.",
      application,
    });
  } catch (error) {
    console.error("Error updating application to hired stage:", error);
    res.status(500).json({
      error:
        "An error occurred while updating the application status to hired.",
    });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const { id: applicationId } = req.params;

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Application not found." });
    }

    const applicantId = application.applicantId; 

    application.status = "Rejected";
    await application.save();

    const notification = new Notification({
      user: applicantId,
      message: `Your job application has been rejected.`,
      type: "applicationRejected",
      isRead: false,
    });
    await notification.save();
    
    const applicantSocketId = getReceiverSocketId(applicantId.toString());
    
    if (applicantSocketId) {
      io.to(applicantSocketId).emit("applicationRejected", {
        message: notification.message,
        applicationId: application._id,
        status: "Rejected",
      });
    } else {
      console.log(`Applicant ${applicantId} is offline. Notification saved.`);
    }    

    res.status(200).json({
      message: "Application successfully rejected.",
      application,
    });
  } catch (error) {
    console.error("Error rejecting application:", error);
    res
      .status(500)
      .json({ error: "An error occurred while rejecting the application." });
  }
};

export const getTotalPending = async (req, res) => {
  const employerId = req.userId;

  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const totalPending = await Application.countDocuments({
      jobId: { $in: jobIds },
      status: "Pending",
    });

    return res.status(200).json({ totalPending });
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    return res.status(500).json({
      error: "An error occurred while fetching the pending applications.",
    });
  }
};

export const getTotalShortlist = async (req, res) => {
  const employerId = req.userId;
  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const totalShortlist = await Application.countDocuments({
      jobId: { $in: jobIds },
      status: "Shortlisted", 
    });

    return res.status(200).json({ totalShortlist });
  } catch (error) {
    console.error("Error fetching shortlisted applications:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while fetching the shortlisted applications.",
      });
  }
};

export const getTotalInterview = async (req, res) => {
  const employerId = req.userId;
  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const totalShortlist = await Application.countDocuments({
      jobId: { $in: jobIds },
      status: "Interview", 
    });

    return res.status(200).json({ totalShortlist });
  } catch (error) {
    console.error("Error fetching Interview applications:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while fetching the Interview applications.",
      });
  }
};

export const getTotalHired = async (req, res) => {
  const employerId = req.userId;
  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const totalShortlist = await Application.countDocuments({
      jobId: { $in: jobIds },
      status: "Hired", 
    });

    return res.status(200).json({ totalShortlist });
  } catch (error) {
    console.error("Error fetching Hired applications:", error);
    return res
      .status(500)
      .json({
        error: "An error occurred while fetching the Hired applications.",
      });
  }
};

export const getShortlistedApplicants = async (req, res) => {
  try {
    const employerId = req.userId;

    const employerJobs = await Job.find({ employer: employerId });

    if (!employerJobs.length) {
      return res
        .status(403)
        .json({ message: "No jobs found for this employer." });
    }

    const shortlistedApplicants = await Application.find({
      jobId: { $in: employerJobs.map((job) => job._id) },
      status: "Shortlisted",
    })
      .populate("jobId", "jobTitle jobCategory jobType")
      .populate("applicantId", "fullName profilePicture")
      .select(
        "applicantId jobId createdAt status coverLetter resume additionalFiles accessibilityNeeds"
      )
      .exec();

    if (!shortlistedApplicants.length) {
      return res
        .status(404)
        .json({ message: "No shortlisted applicants found for your jobs." });
    }

    const shortlistedInfo = shortlistedApplicants.map((applicant) => ({
      id: applicant._id,
      applicantName: applicant.applicantId
        ? applicant.applicantId.fullName
        : "No name provided",
      applicantProfilePicture: applicant.applicantId
        ? applicant.applicantId.profilePicture || "No profile picture available"
        : "No profile picture available",
      jobTitle: applicant.jobId.jobTitle,
      jobCategory: applicant.jobId.jobCategory,
      jobType: applicant.jobId.jobType,
      appliedAt: applicant.createdAt,
      status: applicant.status,
      coverLetter: applicant.coverLetter || "No cover letter provided",
      resume: applicant.resume,
      additionalFiles: applicant.additionalFiles || [],
      accessibilityNeeds: applicant.accessibilityNeeds || "None",
    }));

    res.status(200).json({
      message: "Shortlisted applicants retrieved successfully.",
      shortlistedApplicants: shortlistedInfo,
    });
  } catch (error) {
    console.error("Error fetching shortlisted applicants:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getTotalApplicant = async (req, res) => {
  const employerId = req.userId;

  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }

    const jobIds = jobs.map((job) => job._id);

    const totalApplicants = await Application.aggregate([
      { $match: { jobId: { $in: jobIds } } },
      {
        $group: {
          _id:  {$dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, 
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const chartData = {
      labels: totalApplicants.map(applicant => applicant._id),  
      datasets: [
        {
          label: "Total Applicants",
          data: totalApplicants.map(applicant => applicant.count),  
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };

    return res.status(200).json(chartData);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return res.status(500).json({
      error: "An error occurred while fetching the applicant data.",
    });
  }
};

export const getJobApplicantsCount = async (req, res) => {
  try {
    const employerId = req.userId;

    const employerJobs = await Job.find({ employer: employerId });

    if (!employerJobs.length) {
      return res.status(403).json({ message: "No jobs found for this employer" });
    }

    const jobCounts = await Application.aggregate([
      { $match: { jobId: { $in: employerJobs.map(job => job._id) } } },
      { $group: { _id: "$jobId", applicantCount: { $sum: 1 } } }
    ]);

    const jobStats = employerJobs.map(job => {
      const count = jobCounts.find(j => j._id.toString() === job._id.toString());
      return {
        jobTitle: job.jobTitle,
        applicantCount: count ? count.applicantCount : 0
      };
    });

    res.status(200).json(jobStats);
  } catch (error) {
    console.error("Error fetching job applicant counts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJobPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Applicant") {
      return res.status(403).json({ message: "Access denied. Only applicants can view job preferences." });
    }

    const jobPreferences = {
      jobCategories: user.jobPreferences.jobCategories,
      jobTypes: user.jobPreferences.jobTypes,
      preferredLocations: user.jobPreferences.preferredLocations,
      preferredDisability: user.jobPreferences.preferredDisability || [],
      jobQualifications: user.jobPreferences.jobQualifications,
      jobLevel: user.jobPreferences.jobLevel,
      expectedSalary: {
        minSalary: user.jobPreferences.expectedSalary?.minSalary || 0,
        maxSalary: user.jobPreferences.expectedSalary?.maxSalary || 0,
      },
    };

    return res.status(200).json({ jobPreferences });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateJobPreferences = async (req, res) => {
  try {
    let { jobCategories, jobTypes, preferredLocations, preferredDisability, expectedSalary, jobQualifications, jobLevel } = req.body;

    if (!jobCategories || !jobTypes || !preferredLocations || !expectedSalary || !jobQualifications || !jobLevel) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(jobCategories) || jobCategories.length === 0 || jobCategories.length > 3) {
      return res.status(400).json({ message: "You must select 1 to 3 job categories" });
    }

    if (!Array.isArray(jobTypes) || jobTypes.length === 0 || jobTypes.length > 3) {
      return res.status(400).json({ message: "You must select 1 to 3 job types" });
    }

    if (typeof expectedSalary !== "object" || !expectedSalary.minSalary || !expectedSalary.maxSalary) {
      return res.status(400).json({ message: "Expected salary must be an object with minSalary and maxSalary" });
    }

    expectedSalary.minSalary = Number(expectedSalary.minSalary);
    expectedSalary.maxSalary = Number(expectedSalary.maxSalary);

    if (isNaN(expectedSalary.minSalary) || isNaN(expectedSalary.maxSalary)) {
      return res.status(400).json({ message: "Expected salary values must be numbers" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Applicant") {
      return res.status(403).json({ message: "Access denied. Only applicants can update job preferences." });
    }

    user.jobPreferences = {
      jobCategories,
      jobTypes,
      preferredLocations,
      preferredDisability,
      expectedSalary,
      jobQualifications,
      jobLevel,
    };

    if (!user.hasCompletedProfile) {
      user.hasCompletedProfile = true;
    }

    await user.save();

    const jobPreferences = {
      jobCategories: { $in: jobCategories },
      jobTypes: { $in: jobTypes },
      locations: { $in: preferredLocations },
      preferredDisability: { $in: preferredDisability },
      jobQualifications,
      jobLevel,
      expectedSalary: {
        minSalary: { $gte: expectedSalary.minSalary },
        maxSalary: { $lte: expectedSalary.maxSalary },
      },
    };

    return res.status(200).json({
      message: "Job preferences updated successfully",
      jobPreferences,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};




export const clearJobPreferences = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Applicant") {
      return res.status(403).json({ message: "Access denied. Only applicants can clear job preferences." });
    }

    user.jobPreferences = {}; 

    await user.save();

    return res.status(200).json({
      message: "Job preferences cleared successfully",
      jobPreferences: user.jobPreferences, 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
