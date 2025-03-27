import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  stocklevel,
  updateProduct,
  uploadProduct,
} from "../Controllers/ProductController.js";
import { upload } from "../middlewares/cloudinary.js"; // Import the middleware
import { admin, protect, both } from "../middlewares/protect.js";
import { updateStockMiddleware } from "../Controllers/StockContoller.js";

const router = express.Router();

router.get(
  "/getproducts",
  // protect, both,
  updateStockMiddleware,

  getAllProducts
);
router.get(
  "/getproductid/:id",
  // protect, both,
  updateStockMiddleware,

  getProductById
);
router.post(
  "/uploadproduct",
  upload.single("image"),
  // protect, admin,
  uploadProduct
);
router.delete("/deleteproduct/:id", protect, admin, deleteProduct);
router.patch(
  "/updateproduct/:id",
  upload.single("image"),
  // protect,
  // admin,
  updateProduct
);

router.get("/stocklevel", stocklevel);

export default router;
