import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    collections: { type: String },
    color: { type: String },
    fabric: { type: String },
    images: { type: [String], default: [] },
    listed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;