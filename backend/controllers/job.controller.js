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
      preferredDisabilities,
    } = req.body;

    const expectedSalary = req.body.expectedSalary
      ? JSON.parse(req.body.expectedSalary)
      : undefined;

    const employer = await User.findById(req.userId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }

    const jobAttachmentPath = req.files?.jobAttachment?.[0]?.filename
      ? `http://localhost:8080/uploads/${req.files.jobAttachment[0].filename}`
      : null;

    const finalCompanyName =
      companyName || employer.employerInformation?.companyName;
    const finalLocations = locations || [
      employer.employerInformation?.companyAddress,
    ];
    const finalPreferredDisabilities = preferredDisabilities?.length
      ? preferredDisabilities
      : ["Any"];

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
      preferredDisabilities: finalPreferredDisabilities,
    });

    res.status(201).json({
      message: "Job posted successfully",
      job: { ...job._doc },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const AllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );

    const updatedJobs = jobs.map((job) => {
      const jobData = job.toObject(); 
      if (jobData.jobAttachment) {
        jobData.jobAttachment = `${jobData.jobAttachment}`;
      }
      return jobData;
    });

    res.status(200).json(updatedJobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const userPreferences = await User.findById(req.userId).select('jobPreferences');
    
    if (!userPreferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    console.log("User Preferences:", userPreferences);

    let filterCriteria = {};

    if (userPreferences.jobPreferences) {
      if (userPreferences.jobPreferences.jobCategory && userPreferences.jobPreferences.jobCategory !== "ALL") {
        filterCriteria.jobCategory = userPreferences.jobPreferences.jobCategory;
      }
    
      if (userPreferences.jobPreferences.jobType) {
        filterCriteria.jobType = userPreferences.jobPreferences.jobType;
      }
    
      if (userPreferences.jobPreferences.preferredLocations && userPreferences.jobPreferences.preferredLocations.length > 0) {
        filterCriteria.locations = { $in: userPreferences.jobPreferences.preferredLocations.map(location => new RegExp(location, 'i')) }; 
      }
    
      if (userPreferences.jobPreferences.expectedSalary) {
        if (userPreferences.jobPreferences.expectedSalary.minSalary > 0) {
          filterCriteria["expectedSalary.minSalary"] = { $gte: Number(userPreferences.jobPreferences.expectedSalary.minSalary) };
        }
        if (userPreferences.jobPreferences.expectedSalary.maxSalary > 0) {
          filterCriteria["expectedSalary.maxSalary"] = { $lte: Number(userPreferences.jobPreferences.expectedSalary.maxSalary) };
        }
      }
    
      if (userPreferences.jobPreferences.jobShift) {
        filterCriteria.jobShift = userPreferences.jobPreferences.jobShift;
      }
    
      if (userPreferences.jobPreferences.jobLevel) {
        filterCriteria.jobLevel = userPreferences.jobPreferences.jobLevel;
      }
    }
    console.log("Filter Criteria:", filterCriteria);

    const jobs = await Job.find(filterCriteria).populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );

    console.log("Jobs Found:", jobs);

    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found matching the preferences" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
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
      jobData.jobAttachment = `${jobData.jobAttachment}`;
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
