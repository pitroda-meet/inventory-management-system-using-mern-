import SupplierModel from "../Models/SupplierModel.js";
import expressAsyncHandler from "express-async-handler";

export const uploadSupplier = expressAsyncHandler(async (req, res) => {
  const { name, contact_person, phone, email, address, products_suplied } =
    req.body;
  const existingSupplier = await SupplierModel.findOne({ email });
  if (existingSupplier) {
    return res.status(400).json({ message: "Supplier already exists" });
  }
  const newSupplier = new SupplierModel({
    name,
    contact_person,
    phone,
    email,
    address,
    products_suplied: products_suplied || [],
  });

  try {
    const Supplier = await newSupplier.save();
    if (Supplier) {
      res
        .status(201)
        .json({ message: "Supplier add Successfully", newSupplier });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Error", error });
  }
});

export const getAllSuppliers = expressAsyncHandler(async (req, res) => {
  try {
    const Suppliers = await SupplierModel.find({});
    res.status(200).json({ success: true, Suppliers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Error", error });
  }
});
