import Wishlist from "../models/Wishlist.js";

export const addToWishlist = async (
  req,
  res
) => {
  try {
    const { userId, productId } = req.body;

    let wishlist = await Wishlist.findOne({
      user: userId,
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        products: [],
      });
    }

    const exists =
      wishlist.products.includes(productId);

    if (!exists) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.json({
      success: true,
      message: "Added to wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (
  req,
  res
) => {
  try {
    const wishlist =
      await Wishlist.findOne({
        user: req.params.userId,
      }).populate("products");

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeWishlist = async (
  req,
  res
) => {
  try {
    const { userId, productId } = req.body;

    const wishlist =
      await Wishlist.findOne({
        user: userId,
      });

    wishlist.products =
      wishlist.products.filter(
        (id) =>
          id.toString() !== productId
      );

    await wishlist.save();

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};