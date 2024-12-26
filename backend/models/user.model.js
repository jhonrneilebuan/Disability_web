import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //for login
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

    //for signup
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer", "Applicant"],
      required: true,
    },
    privacyAgreement: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,

    //for Profile Information
    profilePicture: {
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

    //for Career Information
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
    },

    //Disability Information
    disabilityInformation: {
      verificationId: {
        type: String,
      },
      isIdVerified: {
        type: Boolean,
        default: false,
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
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
