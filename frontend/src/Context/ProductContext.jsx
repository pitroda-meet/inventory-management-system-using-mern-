import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ProductContext = createContext(undefined);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchProduct = async (page = 1, limit = 5) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/product/getproducts?page=${page}&limit=${limit}`
      );

      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setPagination({
          currentPage: response.data.page,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalproduct,
        });
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  const getProductById = async (productId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/product/getproductid/${productId}`
      );
      setEditingProduct(response.data.product);
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (product) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/product/uploadproduct`,

        product,
        // { withCredentials: true },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data && response.data.newProduct) {
        setProducts(response.data.newProduct);
        fetchProduct();

        setIsAddOpen(false);
        toast.success(response.data.message);
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (productId, formData) => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/product/updateproduct/${productId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response from updateProduct API:", response.data);

      if (response.data && response.data.updatedProduct) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? response.data.updatedProduct : product
          )
        );
        setEditingProduct(null);
        setIsEditOpen(false);
        toast.success(response.data.message);
        fetchProduct();
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);

      if (error.response?.data?.message) {
        alert(`Product update failed: ${error.response?.data?.message}`);
      } else {
        alert("Product update failed: Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProduct,
        isLoading,
        pagination,
        setPagination,
        setProducts,
        isEditOpen,
        setIsEditOpen,
        isAddOpen,
        setIsAddOpen,
        editingProduct,
        setEditingProduct,
        addProduct,
        deleteProduct,
        updateProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
