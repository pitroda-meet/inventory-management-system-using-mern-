import { useEffect, useState } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useBrand } from "../../Context/BrandContext";
import { useCategory } from "../../Context/CategoryContext";
import { useSupplier } from "../../Context/SupplierContext";

const AddProduct = () => {
  const { addProduct, isAddOpen, setIsAddOpen } = useProductContext();
  const { brands, isbrandLoad } = useBrand();
  const { categorys, isCategoryLoad } = useCategory();
  const { suppliers, isLoadSupplier } = useSupplier();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("");
    setBrand("");
    setWarranty("");
    setImageFile(null);
    setImagePreview("");
    setSupplier("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // formData.append("price", price);
    // formData.append("cost_price", cost_price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("warranty", warranty);
    formData.append("supplier_id", supplier);
    if (imageFile) formData.append("image", imageFile);

    try {
      await addProduct(formData);
      navigate("/productsmanagement");
      setIsAddOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      {" "}
      {/* Modal Toggle Button */}
      {isAddOpen && (
        <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen backdrop-blur-[1px] overflow-y-auto">
          <div className="relative p-4 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-200 p-4 md:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Product
                </h3>
                <button
                  onClick={() => {
                    setIsAddOpen(false);
                    resetForm();
                  }}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✖
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 overflow-auto p-3">
                {/* Image Column */}
                <div className="flex flex-col items-center justify-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      className="w-full h-80 object-fill rounded-lg shadow-md mb-4"
                    />
                  ) : (
                    <div className="w-full h-80 bg-white rounded-lg mb-4 flex items-center justify-center">
                      <p className="text-gray-500">No image selected</p>
                    </div>
                  )}
                  <label className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-gray-50">
                    <span className="px-4 py-2 bg-gray-800 text-white font-medium">
                      Choose File
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <span className="px-4 py-2 text-gray-800">
                      No Chosen File
                    </span>
                  </label>
                </div>

                {/* Form Column */}
                <div className="flex flex-col space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Product Name */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter product name"
                          className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Warranty */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Warranty
                        </label>
                        <input
                          type="text"
                          value={warranty}
                          onChange={(e) => setWarranty(e.target.value)}
                          placeholder="Enter warranty"
                          className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      {/* Brand */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Brand
                        </label>
                        <select
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="" disabled>
                            Select a Brand
                          </option>
                          {brands.length > 0 ? (
                            brands.map((productBrand) => (
                              <option
                                key={productBrand._id}
                                value={productBrand.name}
                              >
                                {productBrand.name}
                              </option>
                            ))
                          ) : (
                            <option disabled className="text-red-500">
                              No brands available
                            </option>
                          )}
                        </select>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {isCategoryLoad ? (
                            <option disabled className="text-gray-500">
                              Loading categories...
                            </option>
                          ) : categorys.length > 0 ? (
                            categorys.map((productCategory) => (
                              <option
                                key={productCategory._id}
                                value={productCategory.name}
                              >
                                {productCategory.name}
                              </option>
                            ))
                          ) : (
                            <option disabled className="text-red-500">
                              No categories available
                            </option>
                          )}
                        </select>
                      </div>

                      {/*  Price */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Price
                        </label>
                        <input
                          type="text"
                          value="by default 0"
                          placeholder="by default 0 price "
                          className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          disabled
                        />
                      </div>

                      {/* Cost Price */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">
                          Cost Price
                        </label>
                        <input
                          type="text"
                          value="by default 0"
                          placeholder="by default 0 cost_price "
                          className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Supplier
                      </label>
                      <select
                        value={supplier}
                        onChange={(e) => setSupplier(e.target.value)}
                        className="w-full bg-white border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="" disabled>
                          Select Supplier
                        </option>
                        {isLoadSupplier ? (
                          <option disabled className="text-gray-500">
                            Loading categories...
                          </option>
                        ) : suppliers.length > 0 ? (
                          suppliers.map((productsuppliers) => (
                            <option
                              key={productsuppliers._id}
                              value={productsuppliers._id}
                            >
                              {productsuppliers.name}
                            </option>
                          ))
                        ) : (
                          <option disabled className="text-red-500">
                            No categories available
                          </option>
                        )}
                      </select>
                    </div>
                    {/* Product Description */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Product Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                        className="w-full border bg-white border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="min-w-0 w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      Update Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
