import expressAsyncHandler from "express-async-handler";
import StockModel from "../Models/StockModel.js";
import ProductModel from "../Models/ProductModel.js";
import mongoose from "mongoose";
import InvoiceModel from "../Models/InvoiceModel.js";
export const createStock = expressAsyncHandler(async (req, res) => {
  const {
    product_id,
    supplier_id,
    purchase_price,
    purchase_quantity,
    salling_price,
  } = req.body;

  if (
    !product_id ||
    !supplier_id ||
    !purchase_price ||
    !purchase_quantity ||
    !salling_price
  ) {
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
      salling_price: salling_price,
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
    res.status(200).json({
      success: true,
      message: "fetch successfully",
      stocks,
    });
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
          product.price = lastStock.salling_price;

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

export const updatestock = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { purchase_price, purchase_quantity, supplier_id, salling_price } =
    req.body;

  // Validate stock ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid stock ID" });
  }

  // Validate required fields
  if (!purchase_price || !purchase_quantity || !supplier_id || !salling_price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Find stock by ID
    const stock = await StockModel.findById(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Prevent updates if stock is used up
    if (stock.used_up) {
      return res
        .status(400)
        .json({ message: "Stock has been used up and cannot be updated" });
    }

    // Fetch total quantity used in invoices
    const invoicesUsingStock = await InvoiceModel.aggregate([
      { $match: { "products.stock_id": stock._id } },
      { $unwind: "$products" },
      { $match: { "products.stock_id": stock._id } },
      {
        $group: {
          _id: null,
          totalUsedQuantity: { $sum: "$products.quantity" },
        },
      },
    ]);

    const usedQuantity = invoicesUsingStock?.[0]?.totalUsedQuantity || 0;

    // Validate purchase price and quantity
    const price = parseFloat(purchase_price);
    const quantity = parseFloat(purchase_quantity);
    if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
      return res.status(400).json({
        message: "Purchase price and quantity must be valid positive numbers",
      });
    }

    // Prevent decreasing stock below used quantity
    if (quantity < usedQuantity) {
      return res.status(400).json({
        message: `Cannot reduce stock below the used quantity (${usedQuantity})`,
      });
    }

    // Update stock details
    stock.purchase_price = price;
    stock.salling_price = salling_price;
    stock.purchase_quantity = quantity;
    stock.total_cost = price * quantity;
    stock.remaning_quantity = quantity - usedQuantity;
    stock.used_up = stock.remaning_quantity === 0;

    // Update active stock for product
    const product = await ProductModel.findById(stock.product_id);
    if (product) {
      const latestStock = await StockModel.findOne({
        product_id: stock.product_id,
        remaning_quantity: { $gt: 0 },
      })
        .sort({ createdAt: -1 })
        .lean();

      if (latestStock && latestStock._id.toString() === stock._id.toString()) {
        stock.isactiveinproduct = true;
        product.stock = stock.remaning_quantity;
        product.cost_price = stock.purchase_price;
        product.price = stock.salling_price;
        await product.save();
      } else {
        stock.isactiveinproduct = false;
      }
    }

    // Save updated stock
    await stock.save();

    res.status(200).json({
      message: "Stock updated successfully",
      stock,
    });
  } catch (error) {
    console.error("Stock update error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});
