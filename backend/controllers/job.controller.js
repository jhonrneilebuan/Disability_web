import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import User from "../models/user.model.js";

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
      expectedSalary,
      jobAttachment,
    } = req.body;

    const employer = await User.findById(req.userId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

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
      jobAttachment,
    });

    res.status(201).json({ message: "Job posted successfully", job });
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
    res.status(200).json(jobs);
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
      return res
        .status(404)
        .json({ message: "No jobs found for this employer." });
    }

    res.status(200).json(jobs);
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
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
