import User from "../models/user.model.js";
import cloudinary from "../db/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;
    const userId = req.userId;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    console.log("Profile picture input:", profilePicture);

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);

    console.log("Cloudinary upload response:", uploadResponse);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
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
          const uploadResponse = await cloudinary.uploader.upload(
            disabilityInformation.verificationId
          );
          updatedDisabilityInfo.verificationId = uploadResponse.secure_url;
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
