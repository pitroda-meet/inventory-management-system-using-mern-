import mongoose from "mongoose";

const StockScema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  date: {
    type: Date,
    default: Date.now,
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  purchase_price: {
    type: Number,
    required: true,
  },
  purchase_quantity: {
    type: Number,
    required: true,
  },
  remaning_quantity: {
    type: Number,
    required: true,
  },

  total_cost: {
    type: Number,
  },
  isactiveinproduct: {
    type: Boolean,
    default: false,
  },
  used_up: { type: Boolean, default: false },
});

StockScema.pre("save", function (next) {
  if (this.remaning_quantity === 0) {
    this.used_up = true;
    this.isactiveinproduct = false;
  }

  next();
});
const Stock = mongoose.model("Stock", StockScema);
export default Stock;
