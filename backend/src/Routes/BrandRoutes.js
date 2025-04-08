import express from "express";
import {
  deleteBrand,
  getBrand,
  newBrand,
} from "../Controllers/BrandController.js";
import { authorizeRoles, protect } from "../middlewares/protect.js";
const router = express.Router();

router.route("/newBrand").post(protect, authorizeRoles("Admin"), newBrand);
router
  .route("/getBrand")
  .get(protect, authorizeRoles("Admin", "Staff"), getBrand);
router
  .route("/deletebrand/:id")
  .delete(protect, authorizeRoles("Admin"), deleteBrand);
export default router;
