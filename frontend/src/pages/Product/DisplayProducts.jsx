import { useState, useEffect } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import Loader from "../../Component/Loader";
import { Button } from "antd";
import { useCategory } from "../../Context/CategoryContext";
import { useBrand } from "../../Context/BrandContext";
import {
  PlusOutlined,
  TagsOutlined,
  AppstoreAddOutlined,
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
      <div className="overflow-x-auto  rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Products</h2>
        <table className="w-full text-sm text-left border-collapse bg-white shadow-md">
          <thead className="text-xs uppercase bg-white text-gray-800">
            <tr>
              <th className="px-6 py-3 border">Name</th>
              <th className="px-6 py-3 border">Price</th>
              <th className="px-6 py-3 border">Category</th>
              <th className="px-6 py-3 border">Description</th>
              <th className="px-6 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product._id} className={"bg-white"}>
                  <td className="px-6 py-4 border">{product.name}</td>
                  <td className="px-6 py-4 border">${product.price}</td>
                  <td className="px-6 py-4 border">{product.category}</td>
                  <td className="px-6 py-4 border">{product.description}</td>
                  <td className="px-6 py-4 border">
                    <Link
                      to={`/editproduct/${product._id}`}
                      className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center border">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Brands & Categories Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brands Table */}
        <div className="overflow-x-auto  p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Brands</h2>
          <table className="w-full text-sm text-left border-collapse bg-white shadow-md rounded-lg">
            <thead className="text-xs uppercase bg-white text-gray-800">
              <tr>
                <th className="px-6 py-3 border">Name</th>
                <th className="px-6 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {brands.length > 0 ? (
                brands.map((brand, index) => (
                  <tr key={brand._id} className={"bg-white"}>
                    <td className="px-6 py-4 border">{brand.name}</td>
                    <td className="px-6 py-4 border">
                      <button
                        onClick={() => handledeletebrand(brand._id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center border">
                    No brands available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Categories Table */}
        <div className="overflow-x-auto  p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Categories
          </h2>
          <table className="w-full text-sm text-left border-collapse bg-white shadow-md rounded-lg">
            <thead className="text-xs uppercase bg-white text-gray-800">
              <tr>
                <th className="px-6 py-3 border">Name</th>
                <th className="px-6 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {categorys.length > 0 ? (
                categorys.map((category, index) => (
                  <tr key={category._id} className={"bg-white"}>
                    <td className="px-6 py-4 border">{category.name}</td>
                    <td className="px-6 py-4 border">
                      <button
                        onClick={() => handledeletecategory(category._id)}
                        className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center border">
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DisplayProducts;
