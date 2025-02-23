import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CategoryContext = createContext(undefined);

export const CategoryProvider = ({ children }) => {
  const [categorys, setCategory] = useState([]);
  const [isCategoryLoad, setIsCategoryLoad] = useState(false);

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
    <CategoryContext.Provider value={{ categorys, isCategoryLoad }}>
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
