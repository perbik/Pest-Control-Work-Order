import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    product_list,
    removeFromCart,
    getTotalCartAmount,
    getDiscountedAmount,
    setPaymentMethod,
  } = useContext(StoreContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("null");
  const navigate = useNavigate();

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
  };

  const formatNumber = (num) => {
    // Ensure num is a number and convert to string
    const strNum = Number(num).toFixed(2).toString();

    // Split into whole and decimal parts
    const parts = strNum.split(".");

    // Format the whole part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Join them back together with decimal point
    return parts.join(".");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {product_list.map((item) => {
          if (cartItems[item._id] > 0) {
            const itemTotal = item.price * cartItems[item._id];
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.product_img} alt="" />
                  <p>{item.product_name}</p>
                  <p>PHP {formatNumber(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>PHP {formatNumber(itemTotal)}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal: PHP {formatNumber(getTotalCartAmount())}</p>
            <p>Discount: PHP {formatNumber(getDiscountedAmount())}</p>
            <b>
              Total: PHP{" "}
              {formatNumber(getTotalCartAmount() - getDiscountedAmount())}
            </b>
          </div>
          <div className="payment-method">
            <p>Payment Method</p>
            <label>
              <input
                type="radio"
                value="credit card"
                checked={selectedPaymentMethod === "credit card"}
                onChange={handlePaymentMethodChange}
              />
              Credit
            </label>
            <label>
              <input
                type="radio"
                value="debit card"
                checked={selectedPaymentMethod === "debit card"}
                onChange={handlePaymentMethodChange}
              />
              Debit
            </label>
            <label>
              <input
                type="radio"
                value="cash"
                checked={selectedPaymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                value="bank transfer"
                checked={selectedPaymentMethod === "bank transfer"}
                onChange={handlePaymentMethodChange}
              />
              Bank Transfer
            </label>
            <label>
              <input
                type="radio"
                value="check"
                checked={selectedPaymentMethod === "check"}
                onChange={handlePaymentMethodChange}
              />
              Check
            </label>
            <label>
              <input
                type="radio"
                value="e-wallet"
                checked={selectedPaymentMethod === "e-wallet"}
                onChange={handlePaymentMethodChange}
              />
              E-wallet
            </label>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
