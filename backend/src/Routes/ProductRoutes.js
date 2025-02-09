import express from "express";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  uploadProduct,
} from "../Controllers/ProductController.js";
import { upload } from "../middlewares/cloudinary.js"; // Import the middleware
import { admin, protect, both } from "../middlewares/protect.js";

const router = express.Router();

router.get("/getproducts", protect, both, getAllProducts);
router.post(
  "/uploadproduct",
  upload.single("image"),
  protect,
  admin,
  uploadProduct
);
router.delete("/deleteproduct/:id", protect, admin, deleteProduct);
router.patch(
  "/updateproduct/:id",
  upload.single("image"),
  protect,
  admin,
  updateProduct
);

export default router;
