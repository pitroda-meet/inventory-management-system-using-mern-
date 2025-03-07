import { NavLink } from "react-router-dom";
import Loader from "../../Component/Loader";
import { useCartContext } from "../../Context/CartContext";
import { useProductContext } from "../../Context/ProductContext";
import { useEffect } from "react";

const SalesOrder = () => {
  const { products, isLoading, fetchProduct } = useProductContext();
  useEffect(() => {
    fetchProduct();
  }, []);

  const { addProductCart } = useCartContext();

  if (isLoading) return <Loader />;

  return (
    <>
      {products.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
          {products.map((product) => {
            const isOutOfStock = product.stock === 0; // Check stock availability

            return (
              <div
                key={product._id}
                className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md h-full"
              >
                {/* Image Container */}
                <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                  <img
                    className="object-cover w-full h-full"
                    src={product.image_url}
                    alt={product.name}
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 justify-between px-5 pb-5">
                  <div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold text-slate-900 truncate w-full">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-xs md:text-sm lg:text-base text-gray-500 whitespace-pre-line min-h-[40px]">
                      {product.description || " "}
                    </p>
                  </div>

                  {/* Price & Add to Cart Button */}
                  <div className="mt-2 mb-3 flex items-center justify-between">
                    <p>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-slate-900">
                        ₹{product.price}
                      </span>
                    </p>
                    <NavLink
                      to={isOutOfStock ? "#" : "/cart"} // Disable redirection if out of stock
                      className={`flex items-center justify-center rounded-md px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4 text-center text-xs md:text-sm lg:text-base font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 
                        ${
                          isOutOfStock
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-slate-900 hover:bg-gray-700"
                        }`}
                      onClick={(e) => {
                        if (isOutOfStock) {
                          e.preventDefault(); // Prevent action if out of stock
                        } else {
                          addProductCart(product);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </NavLink>
                  </div>

                  {/* Brand & Category */}
                  <div className="flex justify-between text-xs md:text-sm lg:text-base font-medium text-gray-500">
                    <span className="text-gray-700">
                      Brand: {product.brand}
                    </span>
                    <span className="text-gray-500">
                      Category: {product.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-6">
          No products available
        </div>
      )}
    </>
  );
};

export default SalesOrder;
