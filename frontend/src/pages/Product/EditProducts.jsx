import { useEffect, useState } from "react";
import { useProductContext } from "../../Context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProducts = () => {
  const { id } = useParams(); // Get the product ID from URL
  const { editingProduct, getProductById, updateProduct, setEditingProduct } =
    useProductContext();
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
    if (imageFile) formData.append("image", imageFile);

    try {
      await updateProduct(id, formData);
      navigate("/productsmanagement");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="flex   min-h-screen ">
      <div className=" p-8 w-full max-w-4xl  rounded-lg">
        <h3 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
          Edit Product
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Column */}
          <div className="flex flex-col items-center justify-center">
            {/* Image Preview */}
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-80 object-fill rounded-lg shadow-md mb-4"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <p className="text-gray-500">No image selected</p>
              </div>
            )}
            {/* File Input */}
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-4 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>

          {/* Form Column */}
          <div className="flex flex-col space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name and Price */}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price"
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {/* Category and Brand */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  <option value="TV">TV/Monitors</option>
                  <option value="freeze">Freeze</option>
                  <option value="A.C">A.C</option>
                  <option value="washing machine">Washing Machine</option>
                </select>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  <option value="Samsung">Samsung</option>
                  <option value="LG">LG</option>
                  <option value="Daikin">Daikin</option>
                  <option value="Sony">Sony</option>
                </select>
                {/* Warranty */}
                <input
                  type="text"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="Warranty"
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                {/* Stock (disabled) */}
                <input
                  type="text"
                  value={stock}
                  disabled
                  placeholder="Stock"
                  className="border p-4 rounded-lg bg-gray-200 focus:outline-none"
                />
              </div>
              {/* Product Description */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product Description"
                className="border p-4 rounded-lg w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              ></textarea>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
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
