import express from "express";

import {
  addToCart,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);

router.get("/:userId", getCart);

router.delete("/remove", removeFromCart);

router.patch("/increase", increaseQuantity);

router.patch("/decrease", decreaseQuantity);

export default router;