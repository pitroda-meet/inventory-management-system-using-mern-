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
      total_cost: totalcost,
    });
    await newstock.save();
    product.stock = (product.stock || 0) + quantity;
    await product.save();
    if (newstock) {
      res.status(201).json({
        message: "new stock has been created",
        newstock,
        updatedStock: product.stock,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export const updatestock = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { supplier_id, purchase_price, purchase_quantity } = req.body;
  try {
    const stock = await StockModel.findById(id);
    if (!stock) {
      res.status(404).json({ status: 404, message: " stock not found" });
    }
    const oldQuantity = stock.purchase_quantity;

    const product = await ProductModel.findById(stock.product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (purchase_price !== undefined) {
      const newPrice = parseFloat(purchase_price);
      if (isNaN(newPrice)) {
        return res
          .status(400)
          .json({ message: "Purchase price must be a valid number" });
      }
      stock.purchase_price = newPrice;
    }

    if (purchase_quantity !== undefined) {
      const newQuantity = parseFloat(purchase_quantity);
      if (isNaN(newQuantity)) {
        return res
          .status(400)
          .json({ message: "Purchase quantity must be a valid number" });
      }
      stock.purchase_quantity = newQuantity;
      product.stock = product.stock - oldQuantity + newQuantity;
    }

    if (supplier_id) stock.supplier_id = supplier_id;
    stock.total_cost = stock.purchase_price * stock.purchase_quantity;
    await stock.save();
    await product.save();

    return res.status(200).json({
      message: "Stock updated successfully",
      updatedStock: stock,
      updatedProductStock: product.stock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error });
  }
});

export const getAllStock = expressAsyncHandler(async (req, res, next) => {
  try {
    const stocks = await StockModel.find({}).populate("product_id");
    if (stocks.length > 0) {
      res.status(200).json({ success: true, stocks });
    } else {
      res.status(404).json({ message: "No stocks found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
});
