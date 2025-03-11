import React from "react";
import { Button, Modal, Form, Input, Typography, Space, Select } from "antd";
import { MailOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "../../Context/UserContext";

const UserAdd = () => {
  const { isUserModel, setisUserModel, createUser } = useUser();

  const [form] = Form.useForm();

  const handleOk = () => {
    setisUserModel(false);
  };
  const handleCancel = () => {
    setisUserModel(false);
    form.resetFields();
  };
  const onFinish = async (values) => {
    await createUser(values);
    form.resetFields();
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {" "}
      <Modal
        title="User Add"
        open={isUserModel}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          form={form}
          name="userForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label={<strong>user Name</strong>}
            name="name"
            rules={[{ required: true, message: "Please input the user name!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label={<strong>email</strong>}
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid Email!" },
            ]}
          >
            <Input type="email" placeholder="Email" className="py-2" />
          </Form.Item>
          <Form.Item
            label={<strong>select role </strong>}
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="select role">
              <Option value="Staff">Staff</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<strong>Password</strong>}
            name="password"
            rules={[{ required: true, message: "Please input the password!" }]}
          >
            <Input placeholder="password" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="default" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add User
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserAdd;
