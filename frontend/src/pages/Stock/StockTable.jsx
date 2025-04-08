import React, { useEffect } from "react";
import { useStock } from "../../Context/StockContext";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Component/Loader";

const StockTable = () => {
  const { stock, isStockLoading, setStockModel, getAllStock } = useStock();
  useEffect(() => {
    getAllStock();
  }, []);
  const columns = [
    { title: "Product Name", dataIndex: ["product_id", "name"] },
    { title: "Purchase Price", dataIndex: "purchase_price" },
    { title: "Selling Price", dataIndex: "salling_price" },
    { title: "Purchase Quantity", dataIndex: "purchase_quantity" },
    { title: "Remaining Quantity", dataIndex: "remaning_quantity" },
    { title: "Total Cost", dataIndex: "total_cost" },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <EditOutlined
              className="text-gray-500 cursor-pointer"
              onClick={() => setStockModel({ open: true, stock: record })}
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
      {isStockLoading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          dataSource={stock}
          pagination={{ pageSize: 8 }}
          rowKey="_id"
        />
      )}
    </div>
  );
};

export default StockTable;
