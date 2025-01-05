import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobCategory: {
      type: String,
      enum: [
        "ALL",
        "DESIGN",
        "DEVELOPMENT",
        "MARKETING",
        "SALES",
        "ENGINEERING",
        "HR",
        "FINANCE",
        "MANAGEMENT",
        "PRODUCT",
        "CUSTOMER_SUPPORT",
        "OPERATIONS",
        "RESEARCH",
        "EDUCATION",
        "ADMINISTRATION",
        "IT",
        "CONSULTING",
        "HEALTHCARE",
        "CONSTRUCTION",
        "LEGAL",
        "ART",
        "MEDIA",
      ],
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    locations: {
      type: [String],
      required: true,
    },
    preferredLanguage: {
      type: String,
      required: true,
    },
    jobQualifications: {
      type: String,
      enum: [
        "Bachelor's Degree",
        "High School Diploma",
        "Technical Training",
        "College Undergraduate",
        "Master's Degree",
        "Doctorate Degree",
      ],
      required: true,
    },
    jobExperience: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Freelance", "Contract", "Internship"],
      required: true,
    },
    jobShift: {
      type: String,
      enum: ["Part-Time", "Full-Time", "Fixed", "Night-Shift", "Day-Shift"],
      required: true,
    },
    jobLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior", "Manager", "Officer", "Student"],
      required: true,
    },
    applyWithLink: {
      type: String,
      default: "",
    },
    jobSkills: {
      type: [String],
      required: true,
    },
    expectedSalary: {
      minSalary: {
        type: Number,
        required: true,
      },
      maxSalary: {
        type: Number,
        required: true,
      },
    },
    jobAttachment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
