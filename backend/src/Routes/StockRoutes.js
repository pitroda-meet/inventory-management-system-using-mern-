import express from "express";
import {
  createStock,
  getAllStock,
  updatestock,
} from "../Controllers/StockContoller.js";
import { admin, both, protect } from "../middlewares/protect.js";

const router = express.Router();
router.post("/createstock", protect, admin, createStock);
router.patch("/updatestck/:id", protect, admin, updatestock);
router.get("/getstock", protect, both, getAllStock);
export default router;
