import axios from "axios";
import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const [stockModel, setStockModel] = useState({ open: false, stock: null });
  const [isStockLoading, setStockLoading] = useState(false);

  // Fixed: Used setStockModel correctly with an object
  const addStock = async (newStock) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/stock/createstock`,
        newStock,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStock((prevStock) => [...prevStock, response.data.newstock]);
      setStockModel({ open: false, stock: null });
      getAllStock();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to add stock"); // Added better error handling
    } finally {
      setStockLoading(false);
    }
  };

  // Wrapped in useCallback to prevent unnecessary re-renders
  const getAllStock = useCallback(async () => {
    setStockLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/stock/getstock`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStock(response.data.stocks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch stock data"); // Added toast error handling
    } finally {
      setStockLoading(false);
    }
  }, []);

  // Implemented updateStock function
  const updateStock = async (stockId, updatedStock) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/stock/updatestock/${stockId}`,
        updatedStock,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setStock((prevStock) =>
        prevStock.map((s) =>
          s._id === stockId ? response.data.updatedStock : s
        )
      );
      setStockModel({ open: false, stock: null });
      getAllStock();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update stock"); // Added better error handling
    } finally {
      setStockLoading(false);
    }
  };

  return (
    <StockContext.Provider
      value={{
        stock,
        stockModel,
        setStockModel,
        addStock,
        getAllStock,
        isStockLoading,
        updateStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};
