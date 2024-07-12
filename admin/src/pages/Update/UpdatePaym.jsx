import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePaym = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        PurchaseSubtotal: '',
        PaymentMethod: '',
        Discount: '',
        GrandTotal: '',
    });

    const {PaymentID} = useParams();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:8081/updatepaym/'+PaymentID, data);
            if (response.data.success) {
                setData({
                    PurchaseSubtotal: '',
                    PaymentMethod: '',
                    Discount: '',
                    GrandTotal: '',
                });
                toast.success('Payment updated successfully!');
                navigate('/payments');
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error updating payment:', error);
        }
    };
  
  return (
    <div className='add'>
      <h2>Update Payment</h2>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Purchase Subtotal</p>
          <input
            onChange={onChangeHandler}
            value={data.PurchaseSubtotal}
            type="number"
            name="PurchaseSubtotal"
            placeholder="PHP00.00"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Payment Method</p>
          <input
            onChange={onChangeHandler}
            value={data.PaymentMethod}
            type="text"
            name="PaymentMethod"
            placeholder="Cash, Credit, etc."
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Discount</p>
          <input
            onChange={onChangeHandler}
            value={data.Discount}
            type="number"
            name="Discount"
            placeholder="0.00"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Grand Total</p>
          <input
            onChange={onChangeHandler}
            value={data.GrandTotal}
            type="number"
            name="GrandTotal"
            placeholder="999999.99"
          />
        </div>
        <button type="submit" className="add-btn">UPDATE</button>
      </form>
    </div>
  );
};

export default UpdatePaym;
