import React from "react";
import { Form } from "antd";
import StockForm from "../../Component/StockForm";
import { useStock } from "../../Context/StockContext";

const UpdateStock = () => {
  const { stockModel, setStockModel, updateStock } = useStock();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await updateStock(stockModel.stock._id, values);
    setStockModel({ open: false, stock: null });
  };

  return (
    <StockForm
      form={form}
      open={stockModel.open && stockModel.stock}
      stock={stockModel.stock}
      onClose={() => setStockModel({ open: false, stock: null })}
      onSubmit={handleSubmit}
      disabled={true}
    />
  );
};

export default UpdateStock;
