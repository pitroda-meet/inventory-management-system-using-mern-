import express from "express";
import { getCategory, newCategory } from "../Controllers/CategaryController.js";
const router = express.Router();

router.route("/newcategory").post(newCategory);
router.route("/getcategory").get(getCategory);
export default router;
