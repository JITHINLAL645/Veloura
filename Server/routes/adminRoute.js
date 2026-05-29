import express from "express";

import {
  getAllUsers,
  blockUser,
  unblockUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", getAllUsers);

router.patch(
  "/block-user/:id",
  blockUser
);

router.patch(
  "/unblock-user/:id",
  unblockUser
);

export default router;