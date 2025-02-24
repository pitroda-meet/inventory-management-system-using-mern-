import mongoose from "mongoose";

const Invoice = new mongoose.Schema(
  {
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customer_name: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      String: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          require: true,
        },
        discount: {
          type: Number,
          default: 0,
        },
        FinalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    total_price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);
