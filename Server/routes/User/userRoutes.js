import express from "express";

import {
  getProfile,
  updateProfile,
  updateAbout,
  changePassword
} from "../../controllers/userController.js";

import { userAuth } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", userAuth, getProfile);

router.put("/update-profile", userAuth, updateProfile);
router.put("/change-password", userAuth, changePassword);


router.put("/update-about", userAuth, updateAbout);

export default router;