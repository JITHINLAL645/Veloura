import User from "../models/userModel.js";

import bcrypt from "bcryptjs";

import otpGenerator from "otp-generator";

import jwt from "jsonwebtoken";

import sendOtp from "../utils/sendOtp.js";


// STORE OTP TEMPORARILY
const otpStore = {};


// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // CHECK EXISTING USER
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // STORE TEMP DATA
    otpStore[email] = {
      name,
      email,
      password,
      otp,
    };

    // SEND OTP
    await sendOtp(email, otp);

    res.status(200).json({
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};



// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // CHECK TEMP DATA
    const pendingUser = otpStore[email];

    if (!pendingUser) {
      return res.status(400).json({
        message: "Signup session expired",
      });
    }

    // CHECK OTP
    if (pendingUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      pendingUser.password,
      10
    );

    // CREATE USER AFTER OTP VERIFY
    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: hashedPassword,
      isVerified: true,
    });

    // REMOVE TEMP DATA
    delete otpStore[email];

    // TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "OTP Verified Successfully",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};




// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!matchPassword) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Success",
      token,
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};