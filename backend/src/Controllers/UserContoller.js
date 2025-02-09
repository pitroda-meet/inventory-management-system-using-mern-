import User from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
export const createUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existing = await User.findOne({ email: email });
    if (existing) {
      return res.status(200).json({ message: "Already existinh user " });
    }
    const user = new User({ email, password, name });
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
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Login successful",
        token: token,
        userId: user._id,
        role: user.role,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
