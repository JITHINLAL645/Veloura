import express from "express";

import {
  addToWishlist,
  getWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);

router.get("/:userId", getWishlist);

router.delete("/remove", removeWishlist);

export default router;