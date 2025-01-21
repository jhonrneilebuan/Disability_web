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
