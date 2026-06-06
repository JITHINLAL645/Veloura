import User from "../models/userModel.js";
import Product from "../models/Product.js";

export const getAllUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const query = {
      isAdmin: false,
      $or: [
        { name:  { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await User.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const blockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlock: true });
    res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Block failed" });
  }
};

export const unblockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlock: false });
    res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unblock failed" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers    = await User.countDocuments({ isAdmin: false });
    const blockedUsers  = await User.countDocuments({ isAdmin: false, isBlock: true });
    const activeUsers   = await User.countDocuments({ isAdmin: false, isBlock: false });
    const totalProducts = await Product.countDocuments({});

    res.status(200).json({ totalUsers, blockedUsers, activeUsers, totalProducts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};