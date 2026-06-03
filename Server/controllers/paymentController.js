import Stripe from "stripe";
import dotenv from "dotenv";
import Checkout from "../models/Checkout.js";
import Cart from "../models/Cart.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripeSession = async (req, res) => {
  try {
    const { userId, shippingAddress, items, totalAmount } = req.body;

    if (!userId || !shippingAddress || !items?.length || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: { name: item.product.name },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),

      mode: "payment",

      // Pass all order data as metadata so PaymentSuccess can retrieve it
      metadata: {
        userId: userId.toString(),
        totalAmount: totalAmount.toString(),
        shippingAddress: JSON.stringify(shippingAddress),
        items: JSON.stringify(
          items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            size: item.size,
            price: item.product.price,
          }))
        ),
      },

      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.error("createStripeSession error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyStripePayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const { userId, totalAmount, shippingAddress, items } = session.metadata;

    const order = await Checkout.findOneAndUpdate(
      { stripeSessionId: sessionId }, 
      {
        $setOnInsert: {           
          user: userId,
          items: JSON.parse(items),
          shippingAddress: JSON.parse(shippingAddress),
          paymentMethod: "card",
          totalAmount: parseFloat(totalAmount),
          paymentStatus: "paid",
          status: "confirmed",
          stripeSessionId: sessionId,
        },
      },
      {
        upsert: true,             
        new: true,                
        setDefaultsOnInsert: true,
      }
    );

    await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });

    return res.status(200).json({ success: true, orderId: order._id });
  } catch (error) {
    if (error.code === 11000) {
      const existing = await Checkout.findOne({ stripeSessionId: req.body.sessionId });
      return res.status(200).json({ success: true, orderId: existing._id, alreadySaved: true });
    }
    console.error("verifyStripePayment error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    console.log("📦 Fetching orders for userId:", req.params.userId);
    
    const orders = await Checkout.find({ user: req.params.userId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    console.log("📦 Orders found:", orders.length);
    console.log("📦 Sample order:", JSON.stringify(orders[0], null, 2));

    res.json({ success: true, orders });
  } catch (error) {
    console.error("❌ getUserOrders error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};