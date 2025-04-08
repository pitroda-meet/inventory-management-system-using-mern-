import express from "express";
import {
  createInvoice,
  getByIdInvoice,
  getInvoices,
} from "../Controllers/InvoiceContoller.js";
import { authorizeRoles, protect } from "../middlewares/protect.js";
const router = express.Router();

router.post("/createinvoice", protect, authorizeRoles("Admin"), createInvoice);
router.get(
  "/getinvoices",
  protect,
  authorizeRoles("Admin", "Staff"),
  getInvoices
);
router.get(
  "/getbyidinvoice/:id",
  protect,
  authorizeRoles("Admin", "Staff"),
  getByIdInvoice
);

export default router;
