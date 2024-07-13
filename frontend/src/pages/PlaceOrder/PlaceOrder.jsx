// PlaceOrder.jsx

import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, getDiscountedAmount, setPaymentMethod } = useContext(StoreContext);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkoutData = {
      customerDetails: {
        CustomerID: "",
        CustomerName: e.target.name.value,
        CustomerAddress: e.target.address.value,
        CustomerPhone: e.target.phone.value,
        CustomerEmail: e.target.email.value,
      },
      purchaseDetails: {
        PurchaseDate: new Date().toISOString(),
        Products: [], // Populate with products from the cart
        PurchaseSubtotal: getTotalCartAmount(),
        Discount: getDiscountedAmount(),
        GrandTotal: getTotalCartAmount() - getDiscountedAmount(),
        PaymentMethod: "", // Set this based on user's selection
      },
    };

    try {
      const response = await fetch('http://localhost:8081/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      const data = await response.json();
      if (data.success) {
        alert('Order placed successfully!');
        window.location.href = '/order-success';
      } else {
        alert('Failed to place the order. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="text" name="address" placeholder="Address" required />
        <input type="text" name="phone" placeholder="Phone" required />
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
              Total: PHP {formatNumber(getTotalCartAmount() - getDiscountedAmount())}
            </b>
          </div>
          <button type="submit">CONFIRM</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
