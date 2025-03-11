import express from "express";
import {
  createUser,
  deleteuser,
  getAllUser,
  loginUser,
  logoutUser,
  updateUser,
  verifyUser,
} from "../Controllers/UserContoller.js";
import { protect } from "../middlewares/protect.js";
const router = express.Router();
router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.get("/verify", protect, verifyUser);
router.get("/getalluser", protect, getAllUser);
router.patch("/updateuser/:id", protect, updateUser);
router.delete("/deleteuser/:id", protect, deleteuser);

router.post("/logout", logoutUser);
export default router;
