import express from "express";
import {
  getAllSuppliers,
  uploadSupplier,
} from "../Controllers/SupplierController.js";
import { admin, both, protect } from "../middlewares/protect.js";

const router = express.Router();
router.post(
  "/uploadsupplier",
  //  protect, admin,
  uploadSupplier
);
router.route("/getsupplier").get(
  // protect, both,
  getAllSuppliers
);
export default router;
