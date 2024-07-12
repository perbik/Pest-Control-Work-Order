import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCust = () => {

    const navigate = useNavigate();
    const [data, setData] = useState({
        CustomerName: '',
        CustomerAddress: '',
        CustomerPhone: '',
        CustomerEmail: '',
    });

    const {CustomerID} = useParams();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put('http://localhost:8081/updatecust/'+CustomerID, data);
            if (response.data.success) {
                setData({
                    CustomerName: '',
                    CustomerAddress: '',
                    CustomerPhone: '',
                    CustomerEmail: '',
                });
                toast.success('Customer updated successfully!');
                navigate('/customers');
            } else {
                console.error('Error:', response.data);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };
  
  return (
    <div className='add'>
      <h2>Update Customer</h2>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-product-name flex-col">
          <p>Customer/Company Name</p>
          <input
            onChange={onChangeHandler}
            value={data.CustomerName}
            type="text"
            name="CustomerName"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Customer Address</p>
          <input
            onChange={onChangeHandler}
            value={data.CustomerAddress}
            type="text"
            name="CustomerAddress"
            placeholder="Metro Manila, Philippines"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Phone Number</p>
          <input
            onChange={onChangeHandler}
            value={data.CustomerPhone}
            type="text"
            name="CustomerPhone"
            placeholder="09123456789"
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Email Address</p>
          <input
            onChange={onChangeHandler}
            value={data.CustomerEmail}
            type="text"
            name="CustomerEmail"
            placeholder="example@email.com"
          />
        </div>
        <button type="submit" className="add-btn">UPDATE</button>
      </form>
    </div>
  );
};

export default UpdateCust;
