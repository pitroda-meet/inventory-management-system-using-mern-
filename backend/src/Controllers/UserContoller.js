import User from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
export const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(200).json({ message: "Already existinh user " });
    }
    const user = new User({ email, password, name, role });
    await user.save();
    if (user) {
      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }
    const token = user.generateToken();

    return res
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 Day
        httpOnly: true,
        sameSite: "lax", // or "none" if cross-site
        secure: process.env.NODE_ENV === "production", // Important for HTTPS
      })
      .status(200)
      .json({
        token,
        message: "Login successful",
        userId: user._id,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export const verifyUser = expressAsyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Please login to access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User verified",
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

export const getAllUser = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const logoutUser = expressAsyncHandler(async (req, res) => {
  res
    .cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "lax",
    })
    .status(200)
    .json({ message: "Logout successful" });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

export const deleteuser = expressAsyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
