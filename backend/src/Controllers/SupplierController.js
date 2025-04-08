import SupplierModel from "../Models/SupplierModel.js";
import expressAsyncHandler from "express-async-handler";

export const uploadSupplier = expressAsyncHandler(async (req, res) => {
  const { name, contact_person, phone, email, address } = req.body;
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

export const updatedSupplier = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name, contact_person, phone, email, address } = req.body;
  try {
    const existingSupplier = await SupplierModel.findById(id);
    if (!existingSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    existingSupplier.name = name || existingSupplier.name;
    existingSupplier.contact_person =
      contact_person || existingSupplier.contact_person;
    existingSupplier.phone = phone || existingSupplier.phone;
    existingSupplier.email = email || existingSupplier.email;
    existingSupplier.address = address || existingSupplier.address;
    const updatedSupplier = await existingSupplier.save();
    res
      .status(200)
      .json({ message: "Supplier updated Successfully", updatedSupplier });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Error", error });
  }
});

export const deleteSupplier = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const existingSupplier = await SupplierModel.findById(id);
    if (!existingSupplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    await SupplierModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Supplier deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Error", error });
  }
});
