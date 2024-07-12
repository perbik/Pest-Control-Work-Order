//placeorder
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, getDiscountedAmount, setPaymentMethod } =
    useContext(StoreContext);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="total">
          <h2 className="title">Cart Total</h2>
          <div className="total-details">
            <p className="sub-amount">
              Subtotal: PHP {formatNumber(getTotalCartAmount())}
            </p>
            <p className="discount-amount">
              Discount: PHP {formatNumber(getDiscountedAmount())}
            </p>
            <b className="total-amount">
              Total: PHP{" "}
              {formatNumber(getTotalCartAmount() - getDiscountedAmount())}
            </b>
          </div>
          <button type="submit">CONFIRM</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
