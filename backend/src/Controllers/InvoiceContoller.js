import expressAsyncHandler from "express-async-handler";
import InvoiceModel from "../Models/InvoiceModel.js";
import StockModel from "../Models/StockModel.js";
import ProductModel from "../Models/ProductModel.js";

export const createInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const { admin_id, customer_name, phone, email, address, products } =
      req.body;

    if (
      !admin_id ||
      !customer_name ||
      !phone ||
      !email ||
      !address ||
      !products
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Products list cannot be empty!" });
    }

    // ✅ Ensure FinalPrice is always included
    const updatedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await ProductModel.findOne({ _id: item._id }); // 🔥 FIX: Use `product_id` instead of `_id`

        if (!product) {
          throw new Error(`Product with ID ${product._id} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for ${product.name}`);
        }

        // Deduct quantity from stock
        product.stock -= item.quantity;
        await product.save();

        // Update the stock model for tracking remaining quantity
        const stockEntry = await StockModel.findOne({
          product_id: item._id,
          isactiveinproduct: true,
        }); // Get the latest stock entry

        if (stockEntry) {
          stockEntry.remaning_quantity -= item.quantity;
          await stockEntry.save();
        }

        return {
          product_id: item._id, // 🔥 Ensure correct field name
          price: item.price,
          stock_id: stockEntry._id,
          quantity: item.quantity,
          cost_price: product.cost_price,
          discount: item.discount || 0,
          FinalPrice: (item.price - (item.discount || 0)) * item.quantity,
        };
      })
    );

    const total_price = updatedProducts.reduce(
      (acc, item) => acc + item.FinalPrice,
      0
    );

    const newInvoice = new InvoiceModel({
      admin_id,
      customer_name,
      phone,
      email,
      address,
      products: updatedProducts,
      total_price,
    });

    await newInvoice.save();
    res
      .status(201)
      .json({ message: "Invoice created successfully!", newInvoice });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ error: error.message });
  }
});

export const getInvoices = expressAsyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const invoices = await InvoiceModel.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    const totalInvoices = await InvoiceModel.countDocuments();
    res.status(200).json({ invoices, totalInvoices });
  } catch (error) {
    console.error("Error getting invoices:", error);
    res.status(500).json({ error: error.message });
  }
});

export const getByIdInvoice = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await InvoiceModel.findById(id).populate(
      "products.product_id"
    );
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found!" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error getting invoice by ID:", error);
    res.status(500).json({ error: error.message });
  }
});
