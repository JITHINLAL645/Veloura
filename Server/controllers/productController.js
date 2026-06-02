import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const search = req.query.search || "";
    const collections = req.query.collections || "";
    const colors = req.query.colors || "";
    const fabrics = req.query.fabrics || "";

    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : null;

    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : null;

    const sort = req.query.sort || "";

    const query = { listed: true };

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (collections) {
      query.collections = {
        $in: collections.split(","),
      };
    }

    if (colors) {
      query.color = {
        $in: colors.split(","),
      };
    }

    if (fabrics) {
      query.fabric = {
        $in: fabrics.split(","),
      };
    }

    if (minPrice !== null || maxPrice !== null) {
      query.price = {};

      if (minPrice !== null)
        query.price.$gte = minPrice;

      if (maxPrice !== null)
        query.price.$lte = maxPrice;
    }

    let sortOption = { createdAt: -1 };

    if (sort === "price_asc")
      sortOption = { price: 1 };

    if (sort === "price_desc")
      sortOption = { price: -1 };

    const total = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const getFilterOptions = async (req, res, next) => {
  try {
    const [
      collections,
      colors,
      fabrics,
      priceData,
    ] = await Promise.all([
      Product.distinct("collections", {
        listed: true,
      }),

      Product.distinct("color", {
        listed: true,
      }),

      Product.distinct("fabric", {
        listed: true,
      }),

      Product.aggregate([
        { $match: { listed: true } },

        {
          $group: {
            _id: null,
            min: { $min: "$price" },
            max: { $max: "$price" },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      collections: collections.filter(Boolean),
      colors: colors.filter(Boolean),
      fabrics: fabrics.filter(Boolean),

      priceRange: priceData[0] || {
        min: 0,
        max: 500000,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stock,
      price,
      collections,
      color,
      fabric,
    } = req.body;

    const images = req.files
      ? req.files.map(
          (file) => `/uploads/${file.filename}`
        )
      : [];

    const product = await Product.create({
      name,
      description,
      stock: Number(stock),
      price: Number(price),
      collections,
      color,
      fabric,
      images,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const toggleListed = async (req, res, next) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.listed = !product.listed;

    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product =
      await Product.findByIdAndDelete(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.images?.length) {
      product.images.forEach((img) => {
        const filePath = path.join(
          __dirname,
          "..",
          img
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
};

export {
  getProducts,
  getProductById,
  getFilterOptions,
  createProduct,
  toggleListed,
  deleteProduct,
};