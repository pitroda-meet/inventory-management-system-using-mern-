import expressAsyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
export const protect = expressAsyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  try {
    if (!token) {
      return res.status(401).json({ message: "User not Authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json(error.message);
  }
});

export const admin = (req, res, next) => {
  if (req.user?.role === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "User not authorized to access this route" });
  }
};
export const staff = (req, res) => {
  if (req.user?.role === "Admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "User not authorized to access this route" });
  }
};

export const both = (req, res, next) => {
  if (req.user?.role === "Admin" || req.user?.role === "Staff") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "User not authorized to access this route" });
  }
};
