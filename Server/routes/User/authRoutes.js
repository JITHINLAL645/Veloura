import express from "express";

const router = express.Router();

import {
  signup,
  verifyOtp,
  login,
} from "../../controllers/authController.js";

router.post("/signup", signup);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

export default router;