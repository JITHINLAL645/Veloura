import User from "../models/userModel.js";
import bcrypt from "bcryptjs";   


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

 
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
 
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Both fields are required" });
    }
 
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters" });
    }
 
    // Fetch user WITH password (normally excluded)
    const user = await User.findById(req.user.id).select("+password");
 
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
 
    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }
 
    // Hash new password and save
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
 
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};