import React from "react";
import { Button, Modal, Form, Input, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useInvoice } from "../../Context/InoviceContext";

const { Title } = Typography;

const Invoice = () => {
  const { createInvoice, isOpenCartModel, setisOpenCartModel } = useInvoice();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setisOpenCartModel(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    // await createInvoice(values);
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
        open={isOpenCartModel}
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
            label={<strong>customer name</strong>}
            name="customer_name"
            rules={[
              { required: true, message: "Please input the customer name!" },
            ]}
          >
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item
            label={<strong>phone number</strong>}
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            name="email"
            label={<strong>E-mail</strong>}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label={<strong>address</strong>}
            rules={[{ required: true, message: "Please input address" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Invoice genrate
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Invoice;
