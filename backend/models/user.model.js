import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer", "Applicant", "Admin"],
      required: true,
    },
    privacyAgreement: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    hasCompletedProfile: {
      type: Boolean,
      default: false,
    },

    jobPreferences: {
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
        default: "ALL",
      },
      jobType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Freelance", "Contract", "Internship"],
        default: "Full-Time",
      },
      preferredLocations: {
        type: [String],
        default: [],
      },
      preferredDisability: {
        type: [String],
        enum: [
          "Any",
          "Mobility Impairment",
          "Amputation",
          "Cerebral Palsy",
          "Muscular Dystrophy",
          "Spinal Cord Injury",
          "Multiple Sclerosis",
          "Arthritis",
          "Stroke-related Disability",
          "Visual Impairment",
          "Blindness",
          "Hearing Impairment",
          "Deafness",
          "Deafblindness",
          "Down Syndrome",
          "Autism Spectrum Disorder (ASD)",
          "Intellectual Disability",
          "Learning Disability (Dyslexia, Dyscalculia, Dysgraphia)",
          "ADHD (Attention Deficit Hyperactivity Disorder)",
          "Dyslexia",
          "Dyspraxia",
          "Tourette Syndrome",
          "Anxiety Disorder",
          "Depression",
          "Bipolar Disorder",
          "Schizophrenia",
          "Post-Traumatic Stress Disorder (PTSD)",
          "Obsessive-Compulsive Disorder (OCD)",
          "Epilepsy",
          "Chronic Fatigue Syndrome (CFS)",
          "Fibromyalgia",
          "Lupus",
          "Diabetes-related Disability",
          "Chronic Pain",
          "Speech Impairment (Stuttering, Apraxia)",
          "Nonverbal Communication Disabilities",
          "Rare Genetic Disorders",
          "Autoimmune Disorders affecting mobility or cognition",
          "Traumatic Brain Injury (TBI)",
        ],
        default: ["Any"], 
      },
      expectedSalary: {
        minSalary: {
          type: Number,
          default: 0, 
        },
        maxSalary: {
          type: Number,
          default: 0, 
        },
      },
      jobShift: {
        type: String,
        enum: ["Part-Time", "Full-Time", "Fixed", "Night-Shift", "Day-Shift"],
        default: "Full-Time",
      },
      jobLevel: {
        type: String,
        enum: ["Entry", "Mid", "Senior", "Manager", "Officer", "Student"],
        default: "Entry", 
      },
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    profilePicture: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    contact: {
      type: String,
      required: false,
      match: /^[\d\-\+\s]+$/,
    },
    address: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      min: 18,
      max: 99,
    },
    birthday: {
      type: Date,
    },
    bio: {
      type: String,
    },

    careerInformation: {
      fieldOfWork: {
        type: String,
      },
      skills: [String],
      education: {
        type: String,
      },
      workExperience: {
        type: String,
      },
      resume: {
        type: String,
      },
      certifications: [{ type: String }],
    },

    disabilityInformation: {
      verificationId: {
        type: String,
      },
      isIdVerified: {
        type: Boolean,
        default: false,
      },
      accessibilityNeeds: {
        type: String,
      },
      disabilityType: {
        type: String,
        enum: [
          "Visual Impairment",
          "Hearing Impairment",
          "Physical Disability",
          "Intelectual Disability",
          "Other",
        ],
      },
    },

    employerInformation: {
      companyName: {
        type: String,
      },
      companyAddress: {
        type: String,
      },
      verificationId: {
        type: String,
      },
      isIdVerified: {
        type: Boolean,
        default: false,
      },
    },

    banned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
