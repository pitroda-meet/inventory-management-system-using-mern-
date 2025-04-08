import expressAsyncHandler from "express-async-handler";
import BrandModel from "../Models/BrandModel.js";

// Create a new brand
export const newBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }
  try {
    const brand = new BrandModel({ name });
    await brand.save(); // ✅ Fixed `save()`
    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    console.error("Error creating brand:", error.message);
    res.status(500).json({ message: "Failed to create brand" });
  }
});

// Get all brands
export const getBrand = expressAsyncHandler(async (req, res) => {
  try {
    const brands = await BrandModel.find({});
    res.status(200).json({ brands }); // ✅ Return the brands in response
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    res.status(500).json({ message: "Failed to get brands" }); // ✅ Fixed error message
  }
});

export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const brand = await BrandModel.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error deleting brand:", error.message);
  }
});
