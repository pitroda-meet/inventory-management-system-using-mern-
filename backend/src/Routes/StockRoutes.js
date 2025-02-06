import express from "express";
import { createStock, updatestock } from "../Controllers/StockContoller.js";

const router = express.Router();
router.post("/createstock", createStock);
router.patch("/updatestck/:id", updatestock);
export default router;
