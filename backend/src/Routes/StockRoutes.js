import express from "express";
import {
  createStock,
  getAllStock,
  updatestock,
  updateStockMiddleware,
} from "../Controllers/StockContoller.js";
import { authorizeRoles, protect } from "../middlewares/protect.js";

const router = express.Router();
router.post("/createstock", protect, authorizeRoles("Admin"), createStock);
router.put("/updatestock/:id", protect, authorizeRoles("Admin"), updatestock);

router.get("/getstock", protect, authorizeRoles("Admin", "Staff"), getAllStock);
export default router;
