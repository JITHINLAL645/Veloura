import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import sendOtp from "../utils/sendOtp.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const verifiedUser = await User.findOne({ email, isVerified: true });
    if (verifiedUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.findOneAndUpdate(
      { email, isVerified: false },
      { name, email, password: hashedPassword, otp, otpExpiry, isVerified: false },
      { upsert: true, returnDocument: "after" }
    );

    await sendOtp(email, otp);

    res.status(200).json({ success: true, message: "OTP Sent Successfully" });
  } catch (error) {
    console.log("SIGNUP ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const pendingUser = await User.findOne({ email, isVerified: false });

    if (!pendingUser) {
      return res.status(400).json({
        success: false,
        message: "Signup session expired. Please sign up again.",
      });
    }

    if (!pendingUser.otpExpiry || new Date() > pendingUser.otpExpiry) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please sign up again.",
      });
    }

    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const user = await User.findByIdAndUpdate(
      pendingUser._id,
      { isVerified: true, otp: "", otpExpiry: null },
      { returnDocument: "after" }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ success: true, message: "OTP Verified Successfully", user });
  } catch (error) {
    console.log("VERIFY OTP ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    if (user.isBlock) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Contact support.",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, message: "Login Success", user });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};