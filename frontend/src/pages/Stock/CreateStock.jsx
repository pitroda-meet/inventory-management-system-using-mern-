import React from "react";
import { Button, Modal, Form, Input, Typography, Space, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useStock } from "../../Context/StockContext";
import { useSupplier } from "../../Context/SupplierContext";
import { useProductContext } from "../../Context/ProductContext";

const { Title } = Typography;
const { Option } = Select;

const CreateStock = () => {
  const { stockModel, setStockModel, addStock } = useStock();
  const { suppliers } = useSupplier();
  const { products } = useProductContext();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setStockModel(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    await addStock(values);
    form.resetFields();
    setStockModel(false);

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title={<Title level={4}>Add New Stock</Title>}
      open={stockModel}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <Form
        form={form}
        name="stockForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Product Name */}
        <Form.Item
          label="Product Name"
          name="product_id"
          rules={[{ required: true, message: "Please select a product!" }]}
        >
          <Select
            showSearch
            placeholder="Select a product"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {products.map((product) => (
              <Option key={product._id} value={product._id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Supplier Name */}
        <Form.Item
          label="Supplier Name"
          name="supplier_id"
          rules={[{ required: true, message: "Please select a supplier!" }]}
        >
          <Select
            showSearch
            placeholder="Select a supplier"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            {suppliers.map((supplier) => (
              <Option key={supplier._id} value={supplier._id}>
                {supplier.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Purchase Price */}
        <Form.Item
          label="Purchase Price"
          name="purchase_price"
          rules={[{ required: true, message: "Please enter purchase price!" }]}
        >
          <Input type="number" placeholder="Enter purchase price" />
        </Form.Item>

        {/* Purchase Quantity */}
        <Form.Item
          label="Purchase Quantity"
          name="purchase_quantity"
          rules={[
            { required: true, message: "Please enter purchase quantity!" },
          ]}
        >
          <Input type="number" placeholder="Enter purchase quantity" />
        </Form.Item>

        {/* Form Buttons */}
        <Form.Item>
          <Space>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add New Stock
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateStock;
