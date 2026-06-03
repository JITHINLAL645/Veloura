import Checkout from "../models/Checkout.js";
import Cart from "../models/Cart.js";


const placeOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod, items, totalAmount } = req.body;

    if (!userId || !shippingAddress || !paymentMethod || !items?.length || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, shippingAddress, paymentMethod, items, totalAmount",
      });
    }

    for (const item of items) {
      if (!item.product || !item.quantity || !item.size || !item.price) {
        return res.status(400).json({
          success: false,
          message: "Each item must have product, quantity, size, and price",
        });
      }
    }

    const checkout = new Checkout({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: "confirmed",
      paymentStatus: paymentMethod === "cod" ? "unpaid" : "paid",
    });

    await checkout.save();

    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } }
    );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      orderId: checkout._id,
    });
  } catch (error) {
    console.error("placeOrder error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Checkout.find({ user: userId })
      .populate("items.product", "name images price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("getUserOrders error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Checkout.findById(orderId).populate(
      "items.product",
      "name images price"
    );

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("getOrderById error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Checkout.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (!["pending", "confirmed"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: `Order cannot be cancelled. Current status: ${order.status}`,
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    console.error("cancelOrder error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { placeOrder, getUserOrders, getOrderById, cancelOrder };