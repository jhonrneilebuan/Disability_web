import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
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
