import { useState, useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import Loader from "../../Component/Loader";
import { Button, Table, Tag, Space } from "antd";
import { useCategory } from "../../Context/CategoryContext";
import { useBrand } from "../../Context/BrandContext";
import {
  PlusOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const DisplayProducts = () => {
  const { products, isLoading, setIsAddOpen, fetchProduct } =
    useProductContext();
  const { brands, showBrandModal, deletebrand } = useBrand();
  const { showModal, categorys, deletecategory } = useCategory();

  if (isLoading) return <Loader />;

  const handledeletebrand = async (Id) => {
    try {
      await deletebrand(Id);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const handledeletecategory = async (categoryId) => {
    try {
      await deletecategory(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // Products table columns
  const productColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",

      render: (_, record) => (
        <Space size="middle">
          <Link to={`/editproduct/${record._id}`}>
            <Button type="primary" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Brands table columns
  const brandColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handledeletebrand(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Categories table columns
  const categoryColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handledeletecategory(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-3 w-full">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full md:w-auto">
          <Button type="primary" icon={<TagsOutlined />} onClick={showModal}>
            Add Category
          </Button>
          <Button
            type="primary"
            icon={<AppstoreAddOutlined />}
            onClick={showBrandModal}
          >
            Add Brand
          </Button>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsAddOpen(true)}
            className="w-full md:w-auto"
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-lg p-4 mb-6 bg-white shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>
        <Table
          columns={productColumns}
          dataSource={products}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No products available" }}
          scroll={{ x: 600 }}
          size="small"
        />
      </div>

      {/* Brands & Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brands Table */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Brands</h2>
          <Table
            columns={brandColumns}
            dataSource={brands}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
            locale={{ emptyText: "No brands available" }}
            size="small"
          />
        </div>

        {/* Categories Table */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <Table
            columns={categoryColumns}
            dataSource={categorys}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
            locale={{ emptyText: "No categories available" }}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;
