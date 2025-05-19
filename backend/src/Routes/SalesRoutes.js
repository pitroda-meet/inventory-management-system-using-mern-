import { Router } from "express";
import { getDashboardSummary } from "../Controllers/salesController.js";

const router = Router();

router.get("/summary", getDashboardSummary);

export default router;
