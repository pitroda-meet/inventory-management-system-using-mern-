import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const SupplierContext = createContext({});
export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoadSupplier, setIsLoadSupplier] = useState(false);
  const [SuppliersModel, setSuppliersModel] = useState({
    open: false,
    supplier: null,
  });
  const fetchsupplier = async () => {
    try {
      setIsLoadSupplier(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/supplier/getsupplier`,
        { withCredentials: true }
      );
      setSuppliers(response.data.Suppliers || []);
    } catch (error) {
      console.log(error.message);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoadSupplier(false);
    }
  };
  useEffect(() => {
    fetchsupplier();
  }, []);

  return (
    <SupplierContext.Provider
      value={{
        suppliers,
        isLoadSupplier,
        SuppliersModel,
        setSuppliersModel,
        fetchsupplier,
        setIsLoadSupplier,
      }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export const useSupplier = () => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
};
