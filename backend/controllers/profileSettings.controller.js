import { uploadToCloudinary } from "../db/cloudinary.js";
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.userId;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const secureUrl = await uploadToCloudinary(profilePicture);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: secureUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile:", error.stack || error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateCoverPhoto = async (req, res) => {
  try {
    const { coverPhoto } = req.body;
    const userId = req.userId;

    if (!coverPhoto) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const secureUrl = await uploadToCloudinary(coverPhoto);

    const updatedCoverPhoto = await User.findByIdAndUpdate(
      userId,
      { coverPhoto: secureUrl },
      { new: true }
    );

    if (!updatedCoverPhoto) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedCoverPhoto);
  } catch (error) {
    console.error("Error in update cover photo:", error.stack || error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userId = req.userId;

    if (!req.files || !req.files.resume || req.files.resume.length === 0) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const resumePath = req.files.resume[0].path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resume: resumePath }, 
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Resume uploaded successfully.", user: updatedUser });
  } catch (error) {
    console.error("Error during resume upload:", error);
    res.status(500).json({
      error: "An error occurred while uploading the resume.",
    });
  }
};


export const uploadCertificates = async (req, res) => {
  try {
    const { certifications } = req.body;
    const userId = req.userId;

    if (!certifications || !Array.isArray(certifications)) {
      return res
        .status(400)
        .json({ message: "Certifications must be an array" });
    }

    const secureUrls = await Promise.all(
      certifications.map((cert) => uploadToCloudinary(cert))
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { certifications: { $each: secureUrls } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in upload certifications:", error.stack || error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const userProfileInfo = async (req, res) => {
  try {
    const {
      contact,
      address,
      age,
      birthday,
      location,
      careerInformation,
      disabilityInformation,
      bio,
    } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateFields = {
      contact,
      address,
      age,
      birthday,
      location,
      bio,
    };

    if (careerInformation) {
      updateFields.careerInformation = {
        ...user.careerInformation,
        ...careerInformation,
      };
    }

    if (disabilityInformation) {
      const updatedDisabilityInfo = { ...user.disabilityInformation };

      if (disabilityInformation.verificationId) {
        try {
          const secureUrl = await uploadToCloudinary(
            disabilityInformation.verificationId
          );
          updatedDisabilityInfo.verificationId = secureUrl;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError.message);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }
      }

      Object.assign(updatedDisabilityInfo, disabilityInformation);
      updateFields.disabilityInformation = updatedDisabilityInfo;
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        user[key] = updateFields[key];
      }
    });

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error(`Error in updating user profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEmployerProfile = async (req, res) => {
  try {
    const { contact, employerInformation } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateFields = {};

    if (employerInformation) {
      const updatedEmployerInfo = { ...user.employerInformation };

      if (employerInformation.companyName) {
        updatedEmployerInfo.companyName = employerInformation.companyName;
      }

      if (employerInformation.companyAddress) {
        updatedEmployerInfo.companyAddress = employerInformation.companyAddress;
      }

      if (employerInformation.verificationId) {
        try {
          const secureUrl = await uploadToCloudinary(
            employerInformation.verificationId
          );
          updatedEmployerInfo.verificationId = secureUrl;
        } catch (uploadError) {
          console.error("Error uploading to Cloudinary:", uploadError.message);
          return res
            .status(500)
            .json({ message: "Cloudinary upload failed for employer info" });
        }
      }

      if (employerInformation.isIdVerified !== undefined) {
        updatedEmployerInfo.isIdVerified = employerInformation.isIdVerified;
      }

      updateFields.employerInformation = updatedEmployerInfo;
    }

    if (contact) {
      updateFields.contact = contact;
    }

    Object.keys(updateFields).forEach((key) => {
      if (updateFields[key] !== undefined) {
        user[key] = updateFields[key];
      }
    });

    await user.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Employer profile updated successfully",
        user,
      });
  } catch (error) {
    console.error(`Error updating employer profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
