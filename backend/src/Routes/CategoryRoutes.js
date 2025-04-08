import express from "express";
import {
  deleteCategory,
  getCategory,
  newCategory,
} from "../Controllers/CategaryController.js";
import { protect, authorizeRoles } from "../middlewares/protect.js";
const router = express.Router();

router
  .route("/newcategory")
  .post(protect, authorizeRoles("Admin"), newCategory);
router
  .route("/getcategory")
  .get(protect, authorizeRoles("Admin", "Staff"), getCategory);
router
  .route("/deletecategory/:id")
  .delete(protect, authorizeRoles("Admin"), deleteCategory);
export default router;
