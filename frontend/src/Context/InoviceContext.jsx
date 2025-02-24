import { createContext, useContext, useState } from "react";
import { useCartContext } from "./CartContext";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const { Cart } = useCartContext();

  const [isOpenCartModel, setisOpenCartModel] = useState(false);
  const [Invoice, setInvoice] = useState([]);
  const [isLoadInvoice, setisLoadInvoice] = useState(false);
  const showInvoiceModal = () => {
    setisOpenCartModel(true);
  };

  const createInvoice = () => {};
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
