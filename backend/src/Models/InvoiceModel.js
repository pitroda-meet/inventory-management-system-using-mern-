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
      type: String,
      require: true,
      minlength: 10,
      maxlength: 10,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        cost_price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        stock_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stock",
          required: true,
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

const InvoiceModel = mongoose.model("Invoice", Invoice);

export default InvoiceModel;
