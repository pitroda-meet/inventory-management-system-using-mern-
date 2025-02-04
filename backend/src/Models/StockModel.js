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
    require: true,
  },
  purchase_quantity: {
    type: Number,
    require: true,
  },
  total_cost: {
    type: Number,
    require: true,
  },
});
export default Stock = mongoose.model("Stock", StockScema);
