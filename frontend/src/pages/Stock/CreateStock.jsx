import React from "react";
import { Form } from "antd";
import { useStock } from "../../Context/StockContext";
import StockForm from "../../Component/StockForm";

const CreateStock = () => {
  const { stockModel, setStockModel, addStock } = useStock();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await addStock(values);
    setStockModel({ open: false, stock: null });
  };

  return (
    <StockForm
      form={form}
      open={stockModel.open && !stockModel.stock}
      stock={null}
      onClose={() => setStockModel({ open: false, stock: null })}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateStock;
