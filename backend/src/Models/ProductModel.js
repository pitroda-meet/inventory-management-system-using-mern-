import mongoose from "mongoose";

const ProductScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
    },

    cost_price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    warranty: {
      type: Number,
      require: true,
    },
    supplier_id: {
      // type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    image_url: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductScema);
export default Product;
