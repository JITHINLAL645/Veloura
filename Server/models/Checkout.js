import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  size: { type: String, required: true },
  price: { type: Number, required: true },
});

const shippingAddressSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String, default: "" },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: "India" },
  recipientPhone: { type: String, required: true },
});

const checkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [checkoutItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: { type: String, enum: ["card", "upi", "cod"], required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
    stripeSessionId: { type: String, default: "" },  // ← NEW
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);
export default Checkout;