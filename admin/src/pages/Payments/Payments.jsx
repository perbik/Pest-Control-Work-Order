import React, { useEffect, useState } from 'react'
import './Payments.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Payments = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/payments')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []); // Add dependency array to run only once

  const handleDelete = (PaymentID) => {
    axios.delete(`http://localhost:8081/deletepaym/${PaymentID}`)
      .then(res => {
        if (res.data.success) {
          setData(data.filter(item => item.PaymentID !== PaymentID));
          navigate('/payments');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='list add flex-col'>
      <p>Payments List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>ID</b>
          <b>Purchase Subtotal</b>
          <b>Payment Method</b>
          <b>Discount</b>
          <b>GrandTotal</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
          <div key={index} className="list-table-format">
            <p>{item.PaymentID}</p>
            <p>{item.PurchaseSubtotal}</p>
            <p>{item.PaymentMethod}</p>
            <p>{item.Discount}</p>
            <p>{item.GrandTotal}</p>
            <p className='btn-div'>
              <Link to={`/updatepaym/${item.PaymentID}`} className="btn-link">Update</Link>
              <button onClick={() => handleDelete(item.PaymentID)} className="btn-div">Delete</button>
            </p>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Payments;
