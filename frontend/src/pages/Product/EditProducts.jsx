import { useEffect, useState } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { useBrand } from "../../Context/BrandContext";
import { useCategory } from "../../Context/CategoryContext";
import { useSupplier } from "../../Context/SupplierContext";

const EditProducts = () => {
  const { id } = useParams(); // Get the product ID from URL
  const { editingProduct, getProductById, updateProduct, setEditingProduct } =
    useProductContext();
  const { brands, isbrandLoad } = useBrand();
  const { categorys, isCategoryLoad } = useCategory();
  const { suppliers, isLoadSupplier } = useSupplier();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [warranty, setWarranty] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // Image preview state
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState("");

  // Fetch product data when the component mounts
  useEffect(() => {
    if (id) {
      getProductById(id); // Fetch the product by ID from context
    }
  }, [id, setEditingProduct]);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setCostPrice(editingProduct.cost_price);
      setCategory(editingProduct.category);
      setBrand(editingProduct.brand);
      setWarranty(editingProduct.warranty);
      setStock(editingProduct.stock);
      setSupplier(editingProduct.supplier_id);
      setImagePreview(editingProduct.image_url);
    }
  }, [editingProduct]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("cost_price", cost_price);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("warranty", warranty);
    formData.append("supplier_id", supplier);

    if (imageFile) formData.append("image", imageFile);

    try {
      await updateProduct(id, formData);
      navigate("/productsmanagement");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="p-8 w-full max-w-full rounded-lg">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Edit Product
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">
          {/* Image Column */}
          <div className="flex flex-col items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-110 object-fill rounded-lg shadow-md mb-4"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">No image selected</p>
              </div>
            )}
            <label className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-gray-50">
              <span className="px-4 py-2 bg-gray-200 text-gray-700 font-medium">
                change image
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="px-4 py-2 text-gray-600">No Chosen File</span>
            </label>
          </div>

          {/* Form Column */}
          <div className="flex flex-col space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid Layout for Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Name */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Brand */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="border bg-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border bg-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

                {/* Price */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Cost Price */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">
                    Cost Price
                  </label>
                  <input
                    type="number"
                    value={cost_price}
                    disabled
                    onChange={(e) => setCostPrice(e.target.value)}
                    className="border p-3 rounded-lg w-full bg-gray-200 focus:outline-none"
                  />
                </div>

                {/* Stock */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Stock</label>
                  <input
                    type="number"
                    value={stock}
                    disabled
                    className="border p-3 rounded-lg w-full bg-gray-200 focus:outline-none"
                  />
                </div>

                {/* Warranty */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Warranty</label>
                  <input
                    type="text"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>

                {/* Supplier */}
                <div className="flex flex-col">
                  <label className="text-gray-700 font-medium">Supplier</label>
                  <select
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="border bg-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Supplier
                    </option>
                    {isLoadSupplier ? (
                      <option disabled className="text-gray-500">
                        Loading suppliers...
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
                        No suppliers available
                      </option>
                    )}
                  </select>
                </div>
              </div>

              {/* Product Description (Full Width) */}
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium">
                  Product Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
