import React, { useEffect } from "react";
import { Table, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useInvoice } from "../../Context/InoviceContext";
import { Link } from "react-router-dom";
import Loader from "../../Component/Loader";

const InvoiceTable = ({ searchText = "" }) => {
  const { Invoice, isLoadInvoice, getInvoice } = useInvoice();

  useEffect(() => {
    getInvoice();
  }, []);
  if (isLoadInvoice) return <Loader />;
  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
    },
    {
      title: "Invoice Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      render: (value, rowData) => {
        if (rowData.payment_method) {
          return rowData.payment_method;
        } else {
          return "N/A";
        }
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (value, rowData) => {
        return (
          <Space size="middle">
            <Link to={`/invoicedetails/${rowData._id}`}>
              <EyeOutlined className="text-gray-500 cursor-pointer" />
            </Link>

            <button>
              <DeleteOutlined className="text-gray-500 cursor-pointer" />
            </button>
          </Space>
        );
      },
    },
  ];

  const filteredData = Array.isArray(Invoice)
    ? Invoice.filter((item) =>
        item.customer_name?.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={{ pageSize: 8 }}
          scroll={{ x: 1000 }}
          rowKey="_id"
        />
      </div>
      <p className="mt-4 text-gray-500 text-sm">
        Showing {filteredData?.length} of {Invoice?.length} invoices
      </p>
    </div>
  );
};

export default InvoiceTable;
