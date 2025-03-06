import axios from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const [stockModel, setStockModel] = useState(false);
  const [isStockLoading, setStockLoading] = useState(false);

  const addStock = async (stock) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/stock/createstock`,
        stock,
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
        }
      );
      setStock((prevStock) => [...prevStock, response.data.newstock]);
      setStockModel(false);
      getAllStock();
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setStockLoading(false);
    }
  };
  const getAllStock = async () => {
    setStockLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/stock/getstock`,
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
        }
      );
      setStock(response.data.stocks);
    } catch (error) {
      console.log(error);
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
