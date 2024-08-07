import { createContext, useState, useEffect } from "react";
import { product_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:8081/products";
  const [cartItems, setCartItems] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null); // No default payment method

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId] || 0;
      const increment = currentQuantity === 0 ? 5 : 1;
      const newQuantity = currentQuantity + increment;

      if (newQuantity > 1000) {
        alert("You can buy a maximum of 1000 units.");
        return prev;
      }

      return { ...prev, [itemId]: newQuantity };
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const currentQuantity = prev[itemId];
      if (currentQuantity > 5) {
        return { ...prev, [itemId]: currentQuantity - 1 };
      } else {
        return { ...prev, [itemId]: currentQuantity - 5 };
      }
    });
  };

  const clearCart = () => {
    setCartItems({});
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = product_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    totalAmount = totalAmount.toFixed(2);
    return totalAmount;
  };

  const getDiscountedAmount = () => {
    const totalAmount = getTotalCartAmount();
    let discount = 0;

    if (paymentMethod === "cash") {
      if (totalAmount >= 150000 && totalAmount <= 179999) {
        discount = totalAmount * 0.05;
      } else if (totalAmount >= 180000) {
        discount = totalAmount * 0.1;
      }
    }

    // Round discount to two decimal places
    discount = discount.toFixed(2);

    return discount;
  };

  const contextValue = {
    product_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalCartAmount,
    paymentMethod,
    setPaymentMethod,
    getDiscountedAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
