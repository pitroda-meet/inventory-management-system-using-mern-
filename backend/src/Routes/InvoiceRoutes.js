import express from "express";
import {
  createInvoice,
  getByIdInvoice,
  getInvoices,
} from "../Controllers/InvoiceContoller.js";
const router = express.Router();

router.post("/createinvoice", createInvoice);
router.get("/getinvoices", getInvoices);
router.get("/getbyidinvoice/:id", getByIdInvoice);

export default router;
