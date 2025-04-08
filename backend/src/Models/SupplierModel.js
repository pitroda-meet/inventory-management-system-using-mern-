import mongoose from "mongoose";

const SupplierSchemsa = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact_person: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier", SupplierSchemsa);

export default Supplier;
