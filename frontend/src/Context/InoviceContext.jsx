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
        `http://localhost:3000/api/invoice/getbyidinvoice/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
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
  const getInvoice = async () => {
    setisLoadInvoice(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/invoice/getinvoices`,
        {
          headers: {
            "Content-Type": "application/json",
            // withCredentials: true,
          },
        }
      );

      if (response.data && response.data.invoices) {
        setInvoice(response.data.invoices);
      }
    } catch (error) {
      console.log(error);
      console.error("Error getting invoice:", error);
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
        "http://localhost:3000/api/invoice/createinvoice",
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
      toast.error("Error creating invoice!");
      console.error("Invoice creation error:", error);
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
