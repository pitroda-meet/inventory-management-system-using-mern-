import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
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
      },
    ],
    discount: {
      type: Number,
      default: 0,
    },

    total_price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export default Order = mongoose.model("Order", OrderSchema);
