import { Modal, Form, Input, Select, Button, Typography, Space } from "antd";
import Title from "antd/es/skeleton/Title";
import React, { useEffect } from "react";

const SupplierForm = ({ open, supplier, onClose, onSubmit, form }) => {
  useEffect(() => {
    if (form && open) {
      if (supplier) {
        form.setFieldsValue(supplier);
      } else {
        form.resetFields();
      }
    }
  }, [supplier, form, open]);

  return (
    <Modal
      title={
        <Title level={4}>{supplier ? "Update supplier" : "Add supplier"}</Title>
      }
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="supplier name"
          name="name"
          rules={[{ required: true, message: "Enter supplier name" }]}
        >
          <Input type="text" placeholder="Enter supplier name" />
        </Form.Item>

        <Form.Item
          label="contact person"
          name="contact_person"
          rules={[{ required: true, message: "Enter contact_person name" }]}
        >
          <Input type="text" placeholder="Enter contact_person name" />
        </Form.Item>

        <Form.Item
          label="phone"
          name="phone"
          rules={[{ required: true, message: "Enter phone number" }]}
        >
          <Input type="number" placeholder="Enter phone number" />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input type="email" placeholder="Enter email" />
        </Form.Item>
        <Form.Item
          label="address"
          name="address"
          rules={[{ required: true, message: "Enter address" }]}
        >
          <Input type="text" placeholder="Enter address" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {supplier ? "Update" : "Add"} supplier
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierForm;
