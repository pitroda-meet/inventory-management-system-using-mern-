import { useState } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { Link } from "react-router-dom";
import Loader from "../../Component/Loader";

const DisplayProducts = () => {
  const { products, isLoading } = useProductContext();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {" "}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mb-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.description}</td>
                  <td>
                    <Link
                      to={`/editproduct/${product._id}`}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No products available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayProducts;
