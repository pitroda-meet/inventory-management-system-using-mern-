import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongodbCon from "./Config/mongodbCon.js";
import * as routes from "./Routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use("/api/user", routes.UserRoutes);
app.use("/api/product", routes.ProductRoutes);
app.use("/api/supplier", routes.SupplierRoutes);
app.use("/api/stock", routes.StockRoutes);
mongodbCon();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
