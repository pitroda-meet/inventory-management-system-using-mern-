import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const SupplierContext = createContext({});
export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoadSupplier, setIsLoadSupplier] = useState(false);
  const fetchsupplier = async () => {
    try {
      setIsLoadSupplier(true);

      const response = await axios.get(
        `http://localhost:3000/api/supplier/getsupplier`
      );
      setSuppliers(response.data.Suppliers || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoadSupplier(false);
    }
  };
  useEffect(() => {
    fetchsupplier();
  }, []);
  return (
    <SupplierContext.Provider value={{ suppliers, isLoadSupplier }}>
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
