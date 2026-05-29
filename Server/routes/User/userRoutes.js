import express from "express";

import {
  getProfile,
  updateProfile,
  updateAbout,
} from "../../controllers/userController.js";

import { userAuth } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", userAuth, getProfile);

router.put("/update-profile", userAuth, updateProfile);

router.put("/update-about", userAuth, updateAbout);

export default router;