import { createContext, useState, useEffect } from "react";
import { product_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null); // No default payment method

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = product_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getDiscountedAmount = () => {
    const totalAmount = getTotalCartAmount();
    let discount = 0;

    if (paymentMethod === "cash") {
      if (totalAmount >= 150000 && totalAmount <= 170000) {
        discount = totalAmount * 0.05;
      } else if (totalAmount >= 180000) {
        discount = totalAmount * 0.1;
      }
    }

    return discount;
  };

  const contextValue = {
    product_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
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
