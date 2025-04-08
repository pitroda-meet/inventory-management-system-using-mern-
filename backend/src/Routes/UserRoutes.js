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
import { authorizeRoles, protect } from "../middlewares/protect.js";
const router = express.Router();
router.post("/createuser", protect, authorizeRoles("Admin"), createUser);
router.post("/loginuser", loginUser);
router.get("/verify", protect, authorizeRoles("Admin", "Staff"), verifyUser);
router.get(
  "/getalluser",
  protect,
  authorizeRoles("Admin", "Staff"),
  getAllUser
);
router.patch("/updateuser/:id", protect, authorizeRoles("Admin"), updateUser);
router.delete("/deleteuser/:id", protect, authorizeRoles("Admin"), deleteuser);

router.post("/logout", protect, authorizeRoles("Admin", "Staff"), logoutUser);
export default router;
