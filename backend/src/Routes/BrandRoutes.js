import express from "express";
import { getBrand, newBrand } from "../Controllers/BrandController.js";
const router = express.Router();

router.route("/newBrand").post(newBrand);
router.route("/getBrand").get(getBrand);
export default router;
