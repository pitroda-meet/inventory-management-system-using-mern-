import React, { useEffect, useState } from "react";
import { Table, Space, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useInvoice } from "../../Context/InoviceContext";
import { Link } from "react-router-dom";
import Loader from "../../Component/Loader";

const InvoiceTable = ({ searchText = "" }) => {
  const { Invoice, isLoadInvoice, getInvoice } = useInvoice();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { totalInvoices } = await getInvoice({
          page: pagination.current,
          limit: pagination.pageSize,
          search: searchText,
        });
        setPagination((prev) => ({ ...prev, total: totalInvoices }));
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchData();
  }, [pagination.current, pagination.pageSize, searchText]);

  const handleTableChange = (newPagination) => {
    setPagination({
      ...newPagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  if (isLoadInvoice) return <Loader />;

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "_id",
      key: "_id",
      render: (id) => id?.substring(0, 8) || "N/A",
    },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
      sorter: (a, b) => a.customer_name?.localeCompare(b.customer_name) || 0,
    },
    {
      title: "Invoice Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (price) => `$${(price || 0).toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Invoice">
            <Link to={`/invoicedetails/${record._id}`}>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-all text-blue-600">
                <EyeOutlined />
              </div>
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Ensure Invoice is always an array
  const tableData = Array.isArray(Invoice) ? Invoice : [];

  // Apply search filter if needed
  const filteredData = searchText
    ? tableData.filter((item) =>
        item.customer_name?.toLowerCase().includes(searchText.toLowerCase())
      )
    : tableData;

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData} // Use the filtered data
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            showSizeChanger: true,
            pageSizeOptions: ["8", "15", "30", "50"],
          }}
          onChange={handleTableChange}
          scroll={{ x: 1000 }}
          rowKey="_id"
          loading={isLoadInvoice}
        />
      </div>
    </div>
  );
};

export default InvoiceTable;
