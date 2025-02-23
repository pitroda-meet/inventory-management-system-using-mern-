import expressAsyncHandler from "express-async-handler";
import ProductModel from "../Models/ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const products = await ProductModel.find().skip(skip).limit(limit);
    const totalproduct = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalproduct / limit);
    res.status(200).json({
      message: "Welcome to the dashboard",
      products,
      totalproduct,
      page,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error });
  }
};
export const uploadProduct = expressAsyncHandler(async (req, res, next) => {
  const {
    name,
    description,
    category,
    brand,
    price,
    cost_price,
    warranty,
    supplier_id,
  } = req.body;

  if (
    !name ||
    !description ||
    !category ||
    !brand ||
    !price ||
    !cost_price ||
    !warranty ||
    !supplier_id ||
    !req.file
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const product = await ProductModel.findOne({ name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = new ProductModel({
      name,
      description,
      category,
      brand,
      price,
      cost_price,
      warranty,
      supplier_id,
      image_url: req.file.path,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product uploaded successfully", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error });
  }
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const imageUrl = product.image_url;
    if (imageUrl) {
      const public_id = imageUrl.split("/").pop().split(".")[0];

      const deleteimage = await cloudinary.uploader.destroy(
        `inventory/${public_id}`
      );

      if (deleteimage.result !== "ok") {
        return res
          .status(500)
          .json({ message: "Failed to delete image from Cloudinary" });
      }

      const productdelete = await ProductModel.deleteOne({ _id: id });
      if (productdelete) {
        return res
          .status(200)
          .json({ message: "Product deleted successfully", productdelete });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", error });
  }
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { name, description, category, brand, supplier_id, warranty, price } =
    req.body;
  const id = req.params.id;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle image deletion and update
    if (req.file) {
      if (product.image_url) {
        const imageUrl = product.image_url;
        const public_id = imageUrl.split("/").pop().split(".")[0];

        // Try deleting the image from Cloudinary
        const deleteResponse = await cloudinary.uploader.destroy(
          `inventory/${public_id}`
        );

        if (deleteResponse.result !== "ok") {
          console.error("Cloudinary image deletion failed:", deleteResponse);
          return res
            .status(500)
            .json({ message: "Failed to delete image from Cloudinary" });
        }
      }

      // Assign new image URL
      product.image_url = req.file.path;
    }

    // Update product fields if they exist
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (warranty) product.warranty = warranty;
    if (supplier_id) product.supplier_id = supplier_id;
    if (price) product.price = price;

    // Save updated product
    const updatedProduct = await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error retrieving product by ID:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve product", details: error.message });
  }
};
