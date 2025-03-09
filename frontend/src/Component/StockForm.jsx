import React, { useEffect } from "react";
import { Modal, Form, Input, Select, Button, Typography, Space } from "antd";
import { useSupplier } from "../Context/SupplierContext";
import { useProductContext } from "../Context/ProductContext";

const { Title } = Typography;
const { Option } = Select;

const StockForm = ({ open, stock, onClose, onSubmit, form, disabled }) => {
  const { suppliers } = useSupplier();
  const { products } = useProductContext();

  useEffect(() => {
    if (form && open) {
      if (stock) {
        form.setFieldsValue({ ...stock, product_id: stock.product_id._id });
      } else {
        form.resetFields();
      }
    }
  }, [stock, form, open]);

  return (
    <Modal
      title={<Title level={4}>{stock ? "Update Stock" : "Add Stock"}</Title>}
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Product"
          name="product_id"
          rules={[{ required: true, message: "Please select a product" }]}
        >
          <Select placeholder="Select product" disabled={disabled}>
            {products.map((product) => (
              <Option key={product._id} value={product._id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Supplier"
          name="supplier_id"
          rules={[{ required: true, message: "Please select a supplier" }]}
        >
          <Select placeholder="Select supplier">
            {suppliers.map((supplier) => (
              <Option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[{ required: true, message: "Enter purchase price" }]}
        >
          <Input type="number" placeholder="Enter purchase price" />
        </Form.Item>

        <Form.Item
          label="Selling Price"
          name="salling_price"
          rules={[{ required: true, message: "Enter selling price" }]}
        >
          <Input type="number" placeholder="Enter selling price" />
        </Form.Item>

        <Form.Item
          label="Purchase Quantity"
          name="purchase_quantity"
          rules={[{ required: true, message: "Enter purchase quantity" }]}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {stock ? "Update" : "Add"} Stock
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StockForm;
