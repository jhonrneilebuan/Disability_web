import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import { io, getReceiverSocketId } from "../db/socket.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    const employers = users.filter(user => user.role === "Employer");
    const applicants = users.filter(user => user.role === "Applicant");

    res.status(200).json({
      employers,
      applicants
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error during user deletion: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};

export const banUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.banned) {
      return res.status(400).json({ message: "User is already banned" });
    }

    user.banned = true;
    await user.save();

    res.status(200).json({ message: "User has been banned successfully" });
  } catch (error) {
    console.error(`Error during user banning: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while banning the user." });
  }
};

export const unbanUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.banned) {
      return res.status(400).json({ message: "User is not banned" });
    }

    user.banned = false;
    await user.save();

    res.status(200).json({ message: "User has been unbanned successfully" });
  } catch (error) {
    console.error(`Error during user unbanning: ${error.message}`);
    res
      .status(500)
      .json({ message: "An error occurred while unbanning the user." });
  }
};

export const getUsersInfo = async (req, res) => {
  try {
    const users = await User.find({});

    const employers = users.filter(user => user.role === "Employer").map(user => ({
      userId: user._id,
      fullName: user.fullName,
      contact: user.contact,
      employerInformation: {
        companyName: user.employerInformation.companyName,
        companyAddress: user.employerInformation.companyAddress,
        verificationId: user.employerInformation.verificationId || "No verification ID",
        isIdVerified: user.employerInformation.isIdVerified
      },
      banned: user.banned
    }));

    const applicants = users.filter(user => user.role === "Applicant").map(user => ({
      userId: user._id,
      fullName: user.fullName,
      contact: user.contact,
      disabilityInformation: {
        verificationId: user.disabilityInformation.verificationId || "No verification ID",
        disabilityType: user.disabilityInformation.disabilityType,
        isIdVerified: user.disabilityInformation.isIdVerified
      },
      banned: user.banned
    }));

    res.status(200).json({
      employers,
      applicants
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

export const updateVerificationStatus = async (req, res) => {
  try {
    const { userId, role, isVerified } = req.body; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (role === "Employer") {
      if (!user.employerInformation || !user.employerInformation.verificationId) {
        return res.status(400).json({ message: "Employer verification ID not found" });
      }
      user.employerInformation.isIdVerified = isVerified;
    } else if (role === "Applicant") {
      if (!user.disabilityInformation || !user.disabilityInformation.verificationId) {
        return res.status(400).json({ message: "Applicant verification ID not found" });
      }
      user.disabilityInformation.isIdVerified = isVerified;
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await user.save();

    return res.status(200).json({
      message: `${role} verification status updated successfully`,
      user,
    });
  } catch (error) {
    console.error("Error updating verification status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (updateData.email) user.email = updateData.email;
    if (updateData.isVerified !== undefined) user.isVerified = updateData.isVerified;
    if (updateData.fullName) user.fullName = updateData.fullName;
    if (updateData.contact) user.contact = updateData.contact;

    if (updateData.role && ["Applicant", "Employer", "Admin"].includes(updateData.role)) {
      user.role = updateData.role;
    }

    if (user.role === "Employer" && updateData.employerInformation) {
      user.employerInformation = {
        ...user.employerInformation,
        ...updateData.employerInformation,
      };
    }

    if (user.role === "Applicant") {
      if (updateData.address) user.address = updateData.address;
      if (updateData.disabilityInformation) {
        user.disabilityInformation = {
          ...user.disabilityInformation,
          ...updateData.disabilityInformation,
        };
      }
    }

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "An error occurred while updating the user." });
  }
};


export const getTotalUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const totalUsers = users.length;

    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ error: "An error occurred while fetching total users." });
  }
};


export const getTotalEmployers = async (req, res) => {
  try {
    const users = await User.find({});
    const totalEmployers = users.filter(user => user.role === "Employer").length;

    res.status(200).json({ totalEmployers });
  } catch (error) {
    console.error("Error fetching total employers:", error);
    res.status(500).json({ error: "An error occurred while fetching total employers." });
  }
};


export const getTotalApplicants = async (req, res) => {
  try {
    const users = await User.find({});
    const totalApplicants = users.filter(user => user.role === "Applicant").length;

    res.status(200).json({ totalApplicants });
  } catch (error) {
    console.error("Error fetching total applicants:", error);
    res.status(500).json({ error: "An error occurred while fetching total applicants." });
  }
};

export const getTotalUser = async (req, res) => {

  try {
    const users = await User.find({});

    if (users.length === 0) {
      return res.status(400).json({ message: "No users found" });
    }

    const totalUsers = await User.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalUsers: totalUsers[0]?.count || 0,
    });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: "An error occurred while fetching total users." });
  }
};

export const getUserPercentage = async (req, res) => {
  try {
    const totalApplicants = await User.countDocuments({ role: "Applicant" });

    const totalEmployers = await User.countDocuments({ role: "Employer" });

    const totalUsers = totalApplicants + totalEmployers;

    if (totalUsers === 0) {
      return res.status(400).json({ message: "No users found" });
    }
    const applicantPercentage = ((totalApplicants / totalUsers) * 100).toFixed(2);
    const employerPercentage = ((totalEmployers / totalUsers) * 100).toFixed(2);

    res.status(200).json({
      totalUsers,
      applicantPercentage,
      employerPercentage,
    });
  } catch (error) {
    console.error("Error fetching user percentages:", error);
    res.status(500).json({ message: "An error occurred while fetching percentages." });
  }
};


export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.userId
    const { fullName, contact } = req.body; 

    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (fullName) admin.fullName = fullName;
    if (contact) admin.contact = contact;

    await admin.save();

    res.status(200).json({
      message: "Admin profile updated successfully",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.userId

    const admin = await User.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.role !== "Admin") {
      return res.status(403).json({ message: "Unauthorized: Not an admin" });
    }

    res.status(200).json({
      message: "Admin profile fetched successfully",
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        profilePicture: admin.profilePicture,
        contact: admin.contact,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//disability bar chart
export const getAllDisabilityCounts = async (req, res) => {
  try {
    const applicants = await User.find(
      {
        role: "Applicant",
        "disabilityInformation.disabilityType": { $exists: true },
      },
      { "disabilityInformation.disabilityType": 1, _id: 0 }
    );

    const disabilityCounts = {};

    applicants.forEach((applicant) => {
      const type = applicant.disabilityInformation?.disabilityType; 
      if (type) {
        disabilityCounts[type] = (disabilityCounts[type] || 0) + 1;
      }
    });

    res.status(200).json(disabilityCounts);
  } catch (error) {
    console.error("Error fetching disability counts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching disability counts." });
  }
};

//id
export const getUploadedDisabilityVerificationIds = async (req, res) => {
  try {
    const users = await User.find({
      "disabilityInformation.verificationId": { $ne: null } 
    }).select("fullName disabilityInformation.verificationId disabilityInformation.isIdVerified");

    if (!users.length) {
      return res.status(404).json({ message: "No users with uploaded verification ID found" });
    }

    const verificationIds = users.map(user => ({
      userId: user._id,
      fullName: user.fullName,
      verificationId: user.disabilityInformation.verificationId,
      isIdVerified: user.disabilityInformation.isIdVerified
    }));

    res.status(200).json(verificationIds);
  } catch (error) {
    console.error("Error fetching uploaded disability verification IDs:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//user list id
export const getDisabilityVerificationId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("disabilityInformation.verificationId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      verificationId: user.disabilityInformation?.verificationId || null,
    });
  } catch (error) {
    console.error("Error fetching disability verification ID:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//approved and  reject
export const updateDisabilityVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isVerified } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Applicant") {
      return res.status(403).json({ message: "Only applicants can be verified" });
    }

    user.disabilityInformation.isIdVerified = isVerified;
    await user.save();

    const notification = await Notification.create({
      user: user._id,
      message: `Your disability verification has been ${isVerified ? "approved" : "rejected"}.`,
      type: "verification",
      isRead: false,
      createdAt: new Date(),
    });

    const applicantSocketId = getReceiverSocketId(user._id.toString());
    if (applicantSocketId) {
      io.to(applicantSocketId).emit("verificationUpdate", {
        message: notification.message,
        userId: user._id,
      });
    }

    res.status(200).json({
      message: `Disability ID verification ${isVerified ? "approved" : "rejected"}`,
      isIdVerified: isVerified,
    });
  } catch (error) {
    console.error("Error updating disability verification status:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



export const getUploadedEmployerVerificationIds = async (req, res) => {
  try {
    const users = await User.find({
      "employerInformation.verificationId": { $ne: null }
    }).select("fullName employerInformation.verificationId employerInformation.isIdVerified");

    if (!users.length) {
      return res.status(404).json({ message: "No employers with uploaded verification ID found" });
    }

    const verificationIds = users.map(user => ({
      userId: user._id,
      fullName: user.fullName,
      verificationId: user.employerInformation.verificationId,
      isIdVerified: user.employerInformation.isIdVerified 
    }));

    res.status(200).json(verificationIds);
  } catch (error) {
    console.error("Error fetching uploaded employer verification IDs:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getEmployerVerificationId = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("employerInformation.verificationId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      verificationId: user.employerInformation?.verificationId || null,
    });
  } catch (error) {
    console.error("Error fetching employer verification ID:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const updateEmployerVerificationStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isVerified } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "Employer") {
      return res.status(403).json({ message: "Only employers can be verified" });
    }

    user.employerInformation.isIdVerified = isVerified;
    await user.save();

    const notification = await Notification.create({
      user: user._id,
      message: `Your employer ID verification has been ${isVerified ? "approved" : "rejected"}.`,
      type: "verification",
      isRead: false,
      createdAt: new Date(),
    });

    const employerSocketId = getReceiverSocketId(user._id.toString());
    if (employerSocketId) {
      io.to(employerSocketId).emit("verificationUpdate", {
        message: notification.message,
        userId: user._id,
      });
    }

    res.status(200).json({
      message: `Employer ID verification ${isVerified ? "approved" : "rejected"}`,
      isIdVerified: isVerified,
    });
  } catch (error) {
    console.error("Error updating employer verification status:", error.stack || error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const getPendingDisabilityVerifications = async (req, res) => {
  try {
    const pendingDisabilityCount = await User.countDocuments({
      "disabilityInformation.isIdVerified": false,
      "disabilityInformation.verificationId": { $ne: null },
    });

    res.status(200).json({
      pendingDisabilityVerifications: pendingDisabilityCount,
    });
  } catch (error) {
    console.error("Error counting pending disability verifications:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const getPendingEmployerVerifications = async (req, res) => {
  try {
    const pendingEmployerCount = await User.countDocuments({
      "employerInformation.isIdVerified": false,
      "employerInformation.verificationId": { $ne: null },
    });

    res.status(200).json({
      pendingEmployerVerifications: pendingEmployerCount,
    });
  } catch (error) {
    console.error("Error counting pending employer verifications:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
