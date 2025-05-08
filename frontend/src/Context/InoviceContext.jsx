import { createContext, useContext, useEffect, useState } from "react";
import { useCartContext } from "./CartContext";
import { toast } from "react-toastify";
import axios from "axios";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const { Cart, clearCart } = useCartContext();
  const [isOpenCartModel, setisOpenCartModel] = useState(false);
  const [Invoice, setInvoice] = useState([]);
  const [byInvoiceId, setbyInvoiceId] = useState([]);
  const [isLoadInvoice, setisLoadInvoice] = useState(false);
  const showInvoiceModal = () => {
    setisOpenCartModel(true);
  };

  const getbyInvoiceId = async (id) => {
    setisLoadInvoice(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoice/getbyidinvoice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        setbyInvoiceId(response.data);
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setisLoadInvoice(false);
    }
  };
  const getInvoice = async (params = {}) => {
    setisLoadInvoice(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/invoice/getinvoices`,
        {
          params: {
            page: params.page || 1,
            limit: params.limit || 10,
            search: params.search || "",
          },
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        setInvoice(response.data.invoices);
        // Return both invoices and total count for pagination
        return {
          invoices: response.data.invoices,
          totalInvoices: response.data.totalInvoices,
        };
      }
    } catch (error) {
      console.error("Error getting invoice:", error);
      throw error;
    } finally {
      setisLoadInvoice(false);
    }
  };

  const createInvoice = async (customerInfo, navigate) => {
    if (!Cart.length) {
      toast.error("Cart is empty!");
      return;
    }

    const invoiceData = {
      admin_id: "67a847e28999b7cc8d9b67a7",
      customer_name: customerInfo.customer_name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      address: customerInfo.address,
      products: Cart,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/invoice/createinvoice`,
        invoiceData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.newInvoice) {
        setInvoice(response.data.newInvoice);
        toast.success(response.data.message);
        navigate("/invoice");
        clearCart();
      }
    } catch (error) {
      console.error("Invoice creation error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        setisLoadInvoice(false);
        setisOpenCartModel(false);
      } else {
        toast.error("An error occurred while creating the invoice.");
      }
    } finally {
      setisLoadInvoice(false);
    }
  };
  return (
    <InvoiceContext.Provider
      value={{
        Invoice,
        createInvoice,
        setInvoice,
        isOpenCartModel,
        setisOpenCartModel,
        isLoadInvoice,
        showInvoiceModal,
        getbyInvoiceId,
        byInvoiceId,
        getInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};
