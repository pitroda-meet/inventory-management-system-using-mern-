import expressAsyncHandler from "express-async-handler";
import StockModel from "../Models/StockModel.js";
import ProductModel from "../Models/ProductModel.js";
import mongoose from "mongoose";
export const createStock = expressAsyncHandler(async (req, res) => {
  const { product_id, supplier_id, purchase_price, purchase_quantity } =
    req.body;

  if (!product_id || !supplier_id || !purchase_price || !purchase_quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const product = await ProductModel.findOne({ _id: product_id });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const price = parseFloat(purchase_price);
  const quantity = parseFloat(purchase_quantity);
  if (isNaN(price) || isNaN(quantity)) {
    return res
      .status(400)
      .json({ message: "Purchase price and quantity must be valid numbers" });
  }
  var totalcost = price * quantity;

  try {
    const newstock = new StockModel({
      product_id,
      supplier_id,
      purchase_price: price,
      purchase_quantity: quantity,
      remaning_quantity: quantity,
      total_cost: totalcost,
    });
    await newstock.save();
    if (newstock) {
      res.status(201).json({
        message: "new stock has been created",
        newstock,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const getAllStock = expressAsyncHandler(async (req, res, next) => {
  try {
    const stocks = await StockModel.find({}).populate("product_id");
    if (stocks.length > 0) {
      res.status(200).json({
        success: true,
        message: "new stock create successfully",
        stocks,
      });
    } else {
      res.status(404).json({ message: "No stocks found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
});
export const updateStockMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    try {
      // Find all products with stock = 0
      const products = await ProductModel.find({ stock: 0 });

      if (products.length === 0) {
        return next(); // No update needed, continue request
      }

      for (const product of products) {
        // Find the most recent stock entry with remaining quantity
        const lastStock = await StockModel.findOne({
          product_id: product._id,
          remaning_quantity: { $gt: 0 }, // Pick stock that still has quantity left
        }).sort({ createdAt: -1 });

        if (lastStock) {
          // Deactivate all other stock entries for this product
          await StockModel.updateMany(
            { product_id: product._id, _id: { $ne: lastStock._id } },
            { isactiveinproduct: false }
          );

          // Activate only the selected stock entry
          lastStock.isactiveinproduct = true;

          // Update product's stock and cost price
          product.stock = lastStock.remaning_quantity;
          product.cost_price = lastStock.purchase_price;

          // Save changes
          await lastStock.save();
          await product.save();
        }
      }

      next(); // Continue to next middleware or controller
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);
