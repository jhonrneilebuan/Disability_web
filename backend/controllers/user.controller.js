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
