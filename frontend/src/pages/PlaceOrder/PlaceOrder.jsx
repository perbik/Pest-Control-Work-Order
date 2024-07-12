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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkoutData = {
      customerDetails: {
          CustomerID: "", 
          CustomerName: "",
          CustomerAddress: "",
          CustomerPhone: "",
          CustomerEmail: ""
      },
      purchaseDetails: {
          PurchaseDate: new Date().toISOString() 
      },
      salesRecords: [
          {
              ProductID: "",
              ProductQuantity: 0,
              ProductAmount: 0.0
          }
      ],
      paymentDetails: {
          PaymentMethod: "",
          PurchaseSubtotal: 0.0,
          Discount: 0.0,
          GrandTotal: 0.0
      }
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
