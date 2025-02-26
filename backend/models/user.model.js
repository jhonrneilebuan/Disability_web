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
          "Physical Disability",
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

    jobPreferences: {
      jobCategories: [{ type: String }],
      jobTypes: [{ type: String }],
      preferredLocations: [{ type: String }],
      preferredDisability: [{ type: String }],
      expectedSalary: {
        minSalary: { type: Number },
        maxSalary: { type: Number },
      },
      jobQualifications: { type: String },
      jobLevel: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
