import User from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -otp");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existing = await User.findOne({ email, _id: { $ne: req.user.id } });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { returnDocument: "after" }
    ).select("-password -otp");

    res.status(200).json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { about },
      { returnDocument: "after" }
    ).select("-password -otp");

    res.status(200).json({ success: true, message: "About updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};