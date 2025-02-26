import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
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
      // jobExperience,
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
    : []; //inalis ko lang yung "Any" saglit

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
      // jobExperience,
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
    const user = await User.findById(req.userId).select("jobPreferences");

    if (!user || !user.jobPreferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    console.log("User Preferences:", user.jobPreferences);

    let filterCriteria = {};

    if (user.jobPreferences.jobCategories?.length > 0) {
      filterCriteria.jobCategory = {
        $in: user.jobPreferences.jobCategories.map(
          (cat) => new RegExp(cat.trim(), "i")
        ),
      };
    }

    if (user.jobPreferences.jobTypes?.length > 0) {
      filterCriteria.jobType = {
        $in: user.jobPreferences.jobTypes.map(
          (type) => new RegExp(type.trim(), "i")
        ),
      };
    }

    if (user.jobPreferences.preferredLocations?.length > 0) {
      filterCriteria.locations = {
        $in: user.jobPreferences.preferredLocations.map(
          (loc) => new RegExp(loc.trim(), "i")
        ),
      };
    }

    if (user.jobPreferences.preferredDisability?.length > 0) {
      filterCriteria.preferredDisabilities = {
        $in: user.jobPreferences.preferredDisability.map(
          (dis) => new RegExp(dis.trim(), "i")
        ),
      };
    }

    if (user.jobPreferences.jobQualifications) {
      filterCriteria.jobQualifications = new RegExp(
        user.jobPreferences.jobQualifications.trim(),
        "i"
      );
    }

    if (user.jobPreferences.jobLevel) {
      filterCriteria.jobLevel = user.jobPreferences.jobLevel;
    }

    if (user.jobPreferences.expectedSalary) {
      const userMin = Number(user.jobPreferences.expectedSalary.minSalary) || 0;
      const userMax =
        Number(user.jobPreferences.expectedSalary.maxSalary) || Infinity;

      filterCriteria.$or = [
        { "expectedSalary.minSalary": { $lte: userMax } },
        { "expectedSalary.maxSalary": { $gte: userMin } },
      ];
    }

    console.log("Filter Criteria:", filterCriteria);

    const jobs = await Job.find(filterCriteria).populate(
      "employer",
      "fullName email employerInformation.companyName employerInformation.companyAddress employerInformation.isIdVerified"
    );

    console.log("Jobs Found:", jobs);

    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found matching the preferences" });
    }

    return res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({ message: "Server error" });
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

    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const totalApplicants = await Application.countDocuments({
          jobId: job._id,
        });
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

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const employerId = req.userId;
    console.log("Job ID:", jobId);
    console.log("Employer ID:", employerId);

 
    const job = await Job.findOne({ _id: jobId, employer: employerId });

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or unauthorized to update." });
    }

    const {
      companyName,
      applicationDeadline,
      jobTitle,
      jobDescription,
      jobCategory,
      locations,
      preferredLanguage,
      jobQualifications,
      jobType,
      jobShift,
      jobLevel,
      applyWithLink,
      jobSkills,
      preferredDisabilities,
    } = req.body;

    let expectedSalary;
    if (req.body.expectedSalary) {
      if (typeof req.body.expectedSalary === 'string') {
        try {
          expectedSalary = JSON.parse(req.body.expectedSalary);
        } catch (error) {
          console.error("Error parsing expectedSalary:", error);
          return res.status(400).json({ message: "Invalid expectedSalary format" });
        }
      } else {
        expectedSalary = req.body.expectedSalary;
      }
    }

    const jobAttachmentPath = req.files?.jobAttachment?.[0]?.filename
      ? `http://localhost:8080/uploads/${req.files.jobAttachment[0].filename}`
      : job.jobAttachment;

    job.companyName = companyName || job.companyName;
    job.applicationDeadline = applicationDeadline || job.applicationDeadline;
    job.jobTitle = jobTitle || job.jobTitle;
    job.jobDescription = jobDescription || job.jobDescription;
    job.jobCategory = jobCategory || job.jobCategory;
    job.locations = locations || job.locations;
    job.preferredLanguage = preferredLanguage || job.preferredLanguage;
    job.jobQualifications = jobQualifications || job.jobQualifications;
    job.jobType = jobType || job.jobType;
    job.jobShift = jobShift || job.jobShift;
    job.jobLevel = jobLevel || job.jobLevel;
    job.applyWithLink = applyWithLink || job.applyWithLink;
    job.jobSkills = jobSkills || job.jobSkills;
    job.expectedSalary = expectedSalary || job.expectedSalary;
    job.jobAttachment = jobAttachmentPath;
    job.preferredDisabilities =
      preferredDisabilities?.length > 0
        ? preferredDisabilities
        : job.preferredDisabilities;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      job: { ...job._doc },
    });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
