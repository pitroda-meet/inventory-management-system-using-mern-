import React, { useEffect } from "react";
import { useSupplier } from "../../Context/SupplierContext";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Component/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const SuppliersTable = () => {
  const {
    suppliers,
    fetchsupplier,
    isLoadSupplier,
    SuppliersModel,
    setSuppliersModel,
  } = useSupplier();

  useEffect(() => {
    fetchsupplier();
  }, []);
  const handleDelete = async (record) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/supplier/delete/${record._id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchsupplier();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const columns = [
    { title: "Supplier Name", dataIndex: ["name"] },
    { title: "contact_person", dataIndex: ["contact_person"] },
    { title: "phone", dataIndex: ["phone"] },
    { title: "email", dataIndex: ["email"] },
    { title: "address", dataIndex: ["address"] },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="text-gray-500 cursor-pointer"
              onClick={() =>
                setSuppliersModel({ open: true, supplier: record })
              }
            />
            <DeleteOutlined
              className="text-gray-500 cursor-pointer"
              onClick={() => handleDelete(record)}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <div className="p-6 bg-white rounded-lg">
      {isLoadSupplier ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          dataSource={suppliers}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default SuppliersTable;
