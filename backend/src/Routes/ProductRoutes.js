import express from "express";
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  uploadProduct,
} from "../Controllers/ProductController.js";
import { upload } from "../middlewares/cloudinary.js"; // Import the middleware

const router = express.Router();

router.get("/getproducts", getAllProducts);
router.post("/uploadproduct", upload.single("image"), uploadProduct);
router.delete("/deleteproduct/:id", deleteProduct);
router.patch("/updateproduct/:id", upload.single("image"), updateProduct);

export default router;
