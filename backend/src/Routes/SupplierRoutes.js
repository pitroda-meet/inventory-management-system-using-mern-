import express from "express";
import {
  getAllSuppliers,
  uploadSupplier,
} from "../Controllers/SupplierController.js";

const router = express.Router();
router.post("/uploadsupplier", uploadSupplier);
router.route("/getsupplier").get(getAllSuppliers);
export default router;
