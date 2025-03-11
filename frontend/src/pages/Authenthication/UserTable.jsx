import React, { useEffect, useState } from "react";
import { Table, Space, Select, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Component/Loader";
import { useUser } from "../../Context/UserContext";

const UserTable = () => {
  const { users, getAllUser, userLoading, updateroll, deleteuser } = useUser();
  const handleRoleChange = (value, record) => {
    updateroll(record._id, value);
  };

  const handleDelete = async (id) => {
    await deleteuser(id);
  };
  const [role, setrole] = useState(users.role);
  const columns = [
    { title: "user name", dataIndex: "name", align: "center" },
    { title: "email", dataIndex: "email", align: "center" },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
      render: (text, record) => (
        <Select
          className="w-25"
          defaultValue={record.role}
          onChange={(value) => handleRoleChange(value, record)}
        >
          <Option value="Staff">Staff</Option>
          <Option value="Admin">Admin</Option>
        </Select>
      ),
    },

    {
      title: "Actions",
      align: "center",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button type="primary" onClick={() => handleDelete(record._id)}>
              <DeleteOutlined className="text-gray-500 cursor-pointer" />
              delete
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <div
      className="p-4 sm:p-6  rounded-lg "
      style={{ backgroundColor: "white" }}
    >
      {userLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ pageSize: 8 }}
            rowKey="_id"
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;
