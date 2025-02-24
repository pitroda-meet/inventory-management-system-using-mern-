import React from "react";
import { useCartContext } from "../../Context/CartContext";
import { Button } from "antd";
import { useInvoice } from "../../Context/InoviceContext";
import Invoice from "../Invoice/Invoice";

const Cart = () => {
  const { Cart, updateQuantity, updateDiscount } = useCartContext();
  const { showInvoiceModal } = useInvoice();
  const calculateDiscountedPrice = (price, discount, quantity) => {
    return (price - discount) * quantity;
  };

  const totalAmount = Cart.reduce(
    (acc, item) =>
      acc + calculateDiscountedPrice(item.price, item.discount, item.quantity),
    0
  );

  return (
    <>
      <Invoice />
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
        {Cart.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden bg-white">
              <thead className="bg-blue-400 text-gray-700 border-b">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Original Price</th>
                  <th className="p-3 text-center">Discount (₹)</th>
                  <th className="p-3 text-center">Final Price</th>
                </tr>
              </thead>
              <tbody>
                {Cart.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`text-center border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition-all`}
                  >
                    <td className="p-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mx-auto border"
                      />
                    </td>
                    <td className="p-3 text-left">{item.name}</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item._id, e.target.value)
                        }
                        className="w-16 p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                    </td>
                    <td className="p-3 text-center">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.discount}
                        min="0"
                        max={item.price}
                        onChange={(e) =>
                          updateDiscount(item._id, e.target.value)
                        }
                        className="w-16 p-2 text-center border rounded-md focus:ring-2 focus:ring-blue-300 outline-none"
                      />
                    </td>
                    <td className="p-3 font-semibold text-blue-600">
                      ₹
                      {calculateDiscountedPrice(
                        item.price,
                        item.discount,
                        item.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-400 text-gray-800 font-bold">
                  <td colSpan="5" className="p-3 text-right">
                    Total:
                  </td>
                  <td className="p-3 text-center">₹{totalAmount.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        )}
        <Button type="primary" onClick={showInvoiceModal}>
          Generate Invoice
        </Button>
      </div>
    </>
  );
};

export default Cart;
