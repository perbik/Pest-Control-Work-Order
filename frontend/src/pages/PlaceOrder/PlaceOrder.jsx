//placeorder
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, getDiscountedAmount, setPaymentMethod } =
    useContext(StoreContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    setSelectedPaymentMethod(method);
    setPaymentMethod(method);
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="total">
          <h2>Cart Totals</h2>
          <div className="total-details">
            <p>Subtotal: PHP {getTotalCartAmount()}</p>
            <p>Discount: PHP {getDiscountedAmount()}</p>
            <b>Total: PHP {getTotalCartAmount() - getDiscountedAmount()}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
