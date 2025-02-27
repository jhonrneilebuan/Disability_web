import { uploadToCloudinary } from "../db/cloudinary.js";
import { getReceiverSocketId, io } from "../db/socket.js";
import Notification from "../models/notification.model.js";
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

    res
      .status(200)
      .json({ message: "Resume uploaded successfully.", user: updatedUser });
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
    const { fullName, contact, age, employerInformation } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (contact) user.contact = contact;
    if (age) user.age = age;

    if (employerInformation) {
      user.employerInformation = {
        ...user.employerInformation,
        ...(employerInformation.companyName && {
          companyName: employerInformation.companyName,
        }),
        ...(employerInformation.companyAddress && {
          companyAddress: employerInformation.companyAddress,
        }),
      };
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Employer profile updated successfully",
      user,
    });
  } catch (error) {
    console.error(`Error updating employer profile: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const uploadDisabilityId = async (req, res) => {
  try {
    const { verificationId } = req.body;
    const userId = req.userId;

    if (!verificationId) {
      return res.status(400).json({ message: "Disability ID is required" });
    }

    let verificationUrl;
    try {
      verificationUrl = await uploadToCloudinary(verificationId);
    } catch (cloudinaryError) {
      console.error(
        "Cloudinary upload error:",
        cloudinaryError.stack || cloudinaryError
      );
      return res.status(400).json({ message: "Invalid image size or format" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "disabilityInformation.verificationId": verificationUrl,
        "disabilityInformation.isIdVerified": false,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const admins = await User.find({ role: "Admin" });

    if (admins.length > 0) {
      const notifications = admins.map((admin) => ({
        user: admin._id,
        message: `User ${updatedUser.fullName} uploaded a Disability ID.`,
        type: "disabilityIdUpload",
        isRead: false,
      }));

      await Notification.insertMany(notifications);

      admins.forEach((admin) => {
        const adminSocketId = getReceiverSocketId(admin._id.toString());
        if (adminSocketId) {
          io.to(adminSocketId).emit("newDisabilityId", {
            message: `User ${updatedUser.fullName} uploaded a Disability ID.`,
            userId: updatedUser._id,
          });
        }
      });
    }

    res.status(200).json({
      message: "Disability ID uploaded successfully",
      verificationId: verificationUrl,
    });
  } catch (error) {
    console.error("Error uploading disability ID:", error.stack || error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const uploadEmployerVerificationId = async (req, res) => {
  try {
    const { verificationId } = req.body;
    const userId = req.userId;

    if (!verificationId) {
      return res
        .status(400)
        .json({ message: "Employer verification ID is required" });
    }

    const verificationUrl = await uploadToCloudinary(verificationId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        "employerInformation.verificationId": verificationUrl,
        "employerInformation.isIdVerified": false,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const admins = await User.find({ role: "Admin" });

    if (admins.length > 0) {
      const notifications = admins.map((admin) => ({
        user: admin._id,
        message: `User ${updatedUser.fullName} uploaded an Employer ID.`,
        type: "employerIdUpload",
        isRead: false,
      }));

      await Notification.insertMany(notifications);

      admins.forEach((admin) => {
        const adminSocketId = getReceiverSocketId(admin._id.toString());
        if (adminSocketId) {
          io.to(adminSocketId).emit("newEmployerId", {
            message: `User ${updatedUser.fullName} uploaded an Employer ID.`,
            userId: updatedUser._id,
          });
        }
      });
    }
    res.status(200).json({
      message: "Employer verification ID uploaded successfully",
      verificationId: verificationUrl,
    });
  } catch (error) {
    console.error(
      "Error uploading employer verification ID:",
      error.stack || error
    );
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
