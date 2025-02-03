import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";


export const createJob = async (req, res) => {
  try {
    const {
      companyName,
      applicationDeadline,
      jobTitle,
      jobDescription,
      jobCategory,
      locations,
      preferredLanguage,
      jobQualifications,
      jobExperience,
      jobType,
      jobShift,
      jobLevel,
      applyWithLink,
      jobSkills,
    } = req.body;

    const expectedSalary = req.body.expectedSalary
      ? JSON.parse(req.body.expectedSalary)
      : undefined;

    const employer = await User.findById(req.userId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

    const jobAttachmentPath = req.files?.jobAttachment
      ? `/uploads/${req.files.jobAttachment[0].filename}` 
      : null;

    const finalCompanyName =
      companyName || employer.employerInformation?.companyName;
    const finalLocations = locations || [
      employer.employerInformation?.companyAddress,
    ];

    const job = await Job.create({
      employer: req.userId,
      companyName: finalCompanyName,
      applicationDeadline,
      jobTitle,
      jobDescription,
      jobCategory,
      locations: finalLocations,
      preferredLanguage,
      jobQualifications,
      jobExperience,
      jobType,
      jobShift,
      jobLevel,
      applyWithLink,
      jobSkills,
      expectedSalary,
      jobAttachment: jobAttachmentPath,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job: {
        ...job._doc,
        jobAttachment: jobAttachmentPath
          ? `http://localhost:8080${jobAttachmentPath}`
          : null,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );

    const updatedJobs = jobs.map((job) => {
      const jobData = job.toObject(); 
      if (jobData.jobAttachment) {
        jobData.jobAttachment = `http://localhost:8080/${jobData.jobAttachment}`;
      }
      return jobData;
    });

    res.status(200).json(updatedJobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployerJobs = async (req, res) => {
  try {
    const employerId = req.userId;

    const jobs = await Job.find({ employer: employerId }).populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this employer." });
    }

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const totalApplicants = await Application.countDocuments({ jobId: job._id });
        return { ...job._doc, totalApplicants }; 
      })
    );

    res.status(200).json(jobsWithApplicants);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const jobData = job.toObject(); 
    if (jobData.jobAttachment) {
      jobData.jobAttachment = `http://localhost:8080/${jobData.jobAttachment}`;
    }

    res.status(200).json(jobData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTotalJobs = async (req, res) => {
  const employerId = req.userId;

  try {
    const jobs = await Job.find({ employer: employerId });

    if (jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found posted by the employer." });
    }

    const totalJobs = jobs.length;

    return res.status(200).json({ totalJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      error: "An error occurred while fetching the jobs.",
    });
  }
};

export const deleteJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id).populate(
      "employer",
      "fullName email"
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await Application.deleteMany({ jobId: req.params.id });

    res.status(200).json({
      success: true,
      message: "Job has been deleted successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
