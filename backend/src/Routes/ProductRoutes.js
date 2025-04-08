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
import { authorizeRoles, protect } from "../middlewares/protect.js";
import { updateStockMiddleware } from "../Controllers/StockContoller.js";

const router = express.Router();

router.get(
  "/getproducts",
  protect,
  authorizeRoles("Admin", "Staff"),

  updateStockMiddleware,

  getAllProducts
);
router.get(
  "/getproductid/:id",
  protect,

  authorizeRoles("Admin", "Staff"),
  updateStockMiddleware,

  getProductById
);
router.post(
  "/uploadproduct",
  protect,
  upload.single("image"),
  authorizeRoles("Admin"),
  uploadProduct
);
router.delete(
  "/deleteproduct/:id",
  protect,
  authorizeRoles("Admin"),
  deleteProduct
);
router.patch(
  "/updateproduct/:id",
  upload.single("image"),
  protect,
  authorizeRoles("Admin"),
  updateProduct
);

router.get("/stocklevel", stocklevel);

export default router;
