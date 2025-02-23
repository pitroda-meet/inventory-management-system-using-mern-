import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const BrandContext = createContext({});

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [isbrandLoad, setIsbrandLoad] = useState(false);

  const fetchbrand = async () => {
    try {
      setIsbrandLoad(true);
      const response = await axios.get(
        `http://localhost:3000/api/brand/getbrand`
      );
      setBrands(response.data.brands || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsbrandLoad(false);
    }
  };
  useEffect(() => {
    fetchbrand();
  }, []);
  return (
    <BrandContext.Provider value={{ brands, isbrandLoad }}>
      {children}
    </BrandContext.Provider>
  );
};
export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
};
