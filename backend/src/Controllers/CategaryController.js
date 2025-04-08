import expressAsyncHandler from "express-async-handler";
import Category from "../Models/CategoryModel.js";

export const newCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const category = new Category({ name });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to create category" });
  }
});
export const getCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).json({ category });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Failed to get categories" });
  }
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
});
