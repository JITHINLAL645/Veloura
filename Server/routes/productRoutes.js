import express from "express";
import upload from "../middleware/upload.js";

import {
  getProducts,
  getProductById,
  getFilterOptions,
  createProduct,
  toggleListed,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/filter-options", getFilterOptions);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", upload.array("images", 5), createProduct);

router.patch("/:id/toggle", toggleListed);

router.delete("/:id", deleteProduct);

export default router;