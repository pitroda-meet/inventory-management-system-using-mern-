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
        `http://localhost:3000/api/category/newcategory`,

        category,
        // { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
    } finally {
      setIsCategoryLoad(false);
    }
  };
  const fetchCategory = async () => {
    try {
      setIsCategoryLoad(true);
      const response = await axios.get(
        `http://localhost:3000/api/category/getcategory`
      );
      setCategory(response.data.category);
    } catch (error) {
      console.log(error.message);
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
        isModalOpen,
        setIsModalOpen,
        showModal,
        addcategory,
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
