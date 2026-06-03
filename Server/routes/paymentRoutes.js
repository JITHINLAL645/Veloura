import express from "express";
import { createStripeSession, verifyStripePayment,getUserOrders } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-session", createStripeSession);
router.post("/verify-payment", verifyStripePayment);
router.get("/orders/:userId", getUserOrders);

export default router;