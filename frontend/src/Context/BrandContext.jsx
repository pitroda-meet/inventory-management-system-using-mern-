import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BrandContext = createContext({});

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [isbrandLoad, setIsbrandLoad] = useState(false);
  const [isModalBrandOpen, setIsModalBrandOpen] = useState(false);
  const showBrandModal = () => {
    setIsModalBrandOpen(true);
  };
  const addbrand = async (brand) => {
    setIsbrandLoad(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/brand/newBrand`,

        brand,
        // { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.brand) {
        setBrands(response.data.brand);

        fetchbrand();

        setIsModalBrandOpen(false);
        toast.success(response.data.message);
      } else {
        console.error("Unexpected server response:", response.data);
      }
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
    } finally {
      setIsbrandLoad(false);
    }
  };

  const fetchbrand = async () => {
    try {
      setIsbrandLoad(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/brand/getbrand`
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
    <BrandContext.Provider
      value={{
        brands,
        isbrandLoad,
        isModalBrandOpen,
        setIsModalBrandOpen,
        showBrandModal,
        addbrand,
      }}
    >
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
