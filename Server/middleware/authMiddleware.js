import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {

    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No Token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.id,
    };

    next();

  } catch (error) {

    console.log("AUTH ERROR :", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};