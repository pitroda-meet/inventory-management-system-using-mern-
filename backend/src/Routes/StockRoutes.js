import express from "express";
import {
  createStock,
  getAllStock,
  updatestock,
} from "../Controllers/StockContoller.js";

const router = express.Router();
router.post("/createstock", createStock);
router.patch("/updatestck/:id", updatestock);
router.get("/getstock", getAllStock);
export default router;
