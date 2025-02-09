import express from "express";
import { createUser, loginUser } from "../Controllers/UserContoller.js";
const router = express.Router();
router.post("/createuser", createUser);
router.get("/loginuser", loginUser);
export default router;
