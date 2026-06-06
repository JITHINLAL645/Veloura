import express from "express";
import upload from "../middleware/upload.js";

import {
  getProducts,
  getProductById,
  getFilterOptions,
  createProduct,
  updateProduct,   
  toggleListed,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/filter-options", getFilterOptions);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", upload.array("images", 5), createProduct);

router.put("/:id", upload.array("images", 5), updateProduct);   

router.patch("/:id/toggle", toggleListed);

router.delete("/:id", deleteProduct);

export default router;