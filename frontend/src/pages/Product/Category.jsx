import React from "react";
import { Button, Modal, Form, Input, Typography, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;

import { useCategory } from "../../Context/CategoryContext";

const Category = () => {
  const { isModalOpen, setIsModalOpen, addcategory } = useCategory();
  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    await addcategory(values);
    form.resetFields();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="categoryForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<strong>Category Name</strong>}
            name="name"
            rules={[
              { required: true, message: "Please input the Category name!" },
            ]}
          >
            <Input placeholder="Enter Category name" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add Category
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Category;
