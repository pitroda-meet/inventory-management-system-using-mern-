import React, { useEffect } from "react";
import { useStock } from "../../Context/StockContext";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loader from "../../Component/Loader";

const StockTable = () => {
  const { stock, getAllStock, isStockLoading } = useStock();

  // if (isStockLoading) return <Loader />;
  // const data = Array.isArray(stock) ? stock : [];

  const columns = [
    {
      title: "Product Image",
      dataIndex: ["product_id", "image_url"],
      render: (imageUrl) => (
        <img
          src={imageUrl}
          alt="Product"
          style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 5 }}
        />
      ),
    },
    {
      title: "Product Name",
      dataIndex: ["product_id", "name"],
    },

    {
      title: "Purchase Price",
      dataIndex: "purchase_price",
    },
    {
      title: "Purchase Quantity",
      dataIndex: "purchase_quantity",
    },
    {
      title: "Remaining Quantity",
      dataIndex: "remaning_quantity",
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Actions",
      render: () => (
        <Space size="middle">
          <EditOutlined className="text-gray-500 cursor-pointer" />
          <DeleteOutlined className="text-gray-500 cursor-pointer" />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="overflow-x-auto">
        {isStockLoading ? (
          <Loader />
        ) : (
          <Table
            columns={columns}
            dataSource={stock}
            pagination={{ pageSize: 8 }}
            rowKey="_id"
            scroll={{ x: 1000 }}
          />
        )}
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        Showing {stock.length} stocks
      </p>
    </div>
  );
};

export default StockTable;
