import React from "react";
import { Button, Modal, Form, Input, Typography, Space } from "antd";
import { useBrand } from "../../Context/BrandContext";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Brands = () => {
  const { isModalBrandOpen, setIsModalBrandOpen, addbrand } = useBrand();

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalBrandOpen(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    await addbrand(values);
    form.resetFields();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Modal
        title={<Title level={4}>Add New Brand</Title>}
        open={isModalBrandOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="brandForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<strong>Brand Name</strong>}
            name="name"
            rules={[
              { required: true, message: "Please input the brand name!" },
            ]}
          >
            <Input placeholder="Enter brand name" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Brand
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Brands;
