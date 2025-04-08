import express from "express";
import {
  deleteSupplier,
  getAllSuppliers,
  updatedSupplier,
  uploadSupplier,
} from "../Controllers/SupplierController.js";
import { authorizeRoles, protect } from "../middlewares/protect.js";

const router = express.Router();
router.post(
  "/uploadsupplier",
  protect,
  authorizeRoles("Admin"),
  uploadSupplier
);
router
  .route("/getsupplier")
  .get(protect, authorizeRoles("Admin", "Staff"), getAllSuppliers);

router
  .route("/update/:id")
  .patch(protect, authorizeRoles("Admin"), updatedSupplier);
router
  .route("/delete/:id")
  .delete(protect, authorizeRoles("Admin"), deleteSupplier);
export default router;
