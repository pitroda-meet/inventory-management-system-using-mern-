import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CategoryContext = createContext(undefined);

export const CategoryProvider = ({ children }) => {
  const [categorys, setCategory] = useState([]);
  const [isCategoryLoad, setIsCategoryLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const addcategory = async (category) => {
    setIsCategoryLoad(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/category/newcategory`,
        category,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data && response.data.category) {
        setCategory(response.data.category);

        fetchCategory();

        setIsCategoryLoad(false);
        setIsModalOpen(false);
        toast.success(response.data.message);
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setIsCategoryLoad(false);
        setIsModalOpen(false);
      } else {
        toast.error("An error occurred while adding the category.");
      }
    } finally {
      setIsCategoryLoad(false);
    }
  };
  const fetchCategory = async () => {
    try {
      setIsCategoryLoad(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/category/getcategory`,
        { withCredentials: true }
      );
      setCategory(response.data.category);
    } catch (error) {
      console.log(error.message);
      if (error.response?.data?.message) {
        // toast.error(error.response.data.message);
        setIsCategoryLoad(false);
        setIsModalOpen(false);
      } else {
        toast.error("An error occurred while fetching categories.");
      }
    } finally {
      setIsCategoryLoad(false);
    }
  };

  const deletecategory = async (categoryId) => {
    try {
      setIsCategoryLoad(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/category/deletecategory/${categoryId}`,

        { withCredentials: true }
      );
      if (response.data && response.data.message) {
        toast.success(response.data.message);

        fetchCategory();
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setIsCategoryLoad(false);
      } else {
        toast.error("An error occurred while deleting the category.");
      }
    } finally {
      setIsCategoryLoad(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <CategoryContext.Provider
      value={{
        categorys,
        isCategoryLoad,
        deletecategory,
        isModalOpen,
        setIsModalOpen,
        showModal,
        addcategory,
        fetchCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
