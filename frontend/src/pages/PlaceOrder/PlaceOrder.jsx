import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getDiscountedAmount,
    formatAmount,
    setPaymentMethod,
  } = useContext(StoreContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeliveryInfo({
      ...deliveryInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const checkResponse = await axios.post(
        "/api/check-delivery-info",
        deliveryInfo
      );
      if (!checkResponse.data.exists) {
        await axios.post("/api/create-delivery-info", deliveryInfo);
      }
      // Proceed to payment
      console.log("Proceeding to payment");
    } catch (error) {
      console.error("Error checking or creating delivery information", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form className="place-order" onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={deliveryInfo.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={deliveryInfo.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={deliveryInfo.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={deliveryInfo.phone}
          onChange={handleInputChange}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div className="place-order-right">
        <div className="total">
          <h2 className="title">Cart Total</h2>
          <div className="total-details">
            <p className="sub-amount">
              Subtotal: {formatAmount(getTotalCartAmount())}
            </p>
            <p className="discount-amount">
              Discount: {formatAmount(getDiscountedAmount())}
            </p>
            <b className="total-amount">
              Total:{" "}
              {formatAmount(getTotalCartAmount() - getDiscountedAmount())}
            </b>
          </div>
          <button type="submit">CONFIRM</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
