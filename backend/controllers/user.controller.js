import User from "../models/user.model.js";

export const searchUsers = async (req, res) => {
  try {
    const { fullName } = req.query;
    console.log("Received fullName:", fullName);

    if (!fullName) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const users = await User.find({
      fullName: { $regex: new RegExp(fullName, "i") },
      role: "Applicant", 
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(`Error in searching users: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const fetchUserData = async (req, res) => {
  const { userId } = req.params; 
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); 
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" }); 
  }
};






