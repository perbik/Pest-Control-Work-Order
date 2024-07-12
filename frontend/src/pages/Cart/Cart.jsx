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
    formatAmount,
  } = useContext(StoreContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("null");
  const navigate = useNavigate();

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
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
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.product_img} alt="" />
                  <p>{item.product_name}</p>
                  <p>{formatAmount(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{formatAmount(item.price * cartItems[item._id])}</p>
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
            <p>Subtotal: {formatAmount(getTotalCartAmount())}</p>
            <p>Discount: {formatAmount(getDiscountedAmount())}</p>
            <b>
              Total:{" "}
              {formatAmount(getTotalCartAmount() - getDiscountedAmount())}
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
