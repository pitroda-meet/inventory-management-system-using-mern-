import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [Cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Cart));
  }, [Cart]);

  const addProductCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p._id === product._id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [
          ...prevCart,
          {
            _id: product._id,
            name: product.name,
            image_url: product.image_url,
            quantity: 1,
            discount: 0,
            price: product.price,
          },
        ];
      }
    });
  };

  const updateQuantity = (productId, quantityValue) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const quantity = Math.max(1, parseInt(quantityValue) || 1); // Ensure quantity is at least 1
        return item._id === productId ? { ...item, quantity } : item;
      })
    );
  };

  const updateDiscount = (productId, discountValue) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const discount = Math.max(
          0,
          Math.min(parseFloat(discountValue) || 0, item.price)
        ); // Prevent negative or excessive discount
        return item._id === productId ? { ...item, discount } : item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{ Cart, addProductCart, updateQuantity, updateDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
