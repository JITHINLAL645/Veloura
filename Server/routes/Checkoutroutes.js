import express from "express";
import { placeOrder, getUserOrders, getOrderById, cancelOrder } from "../controllers/checkoutController.js";

const router = express.Router();

router.post("/place", placeOrder);

router.get("/user/:userId", getUserOrders);

router.get("/:orderId", getOrderById);

router.patch("/:orderId/cancel", cancelOrder);

export default router;