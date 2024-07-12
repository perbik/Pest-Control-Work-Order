import React, { useEffect, useState } from 'react'
import './Purchases.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Purchases = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/purchases')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []); // Add dependency array to run only once

  const handleDelete = (PurchaseID) => {
    axios.delete(`http://localhost:8081/deletepurch/${PurchaseID}`)
      .then(res => {
        if (res.data.success) {
          setData(data.filter(item => item.PurchaseID !== PurchaseID));
          navigate('/purchases');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='purch add flex-col'>
      <p>Purchases List</p>
      <div className="purch-table">
        <div className="purch-table-format title">
          <b>ID</b>
          <b>Purchase Date</b>
          <b>Customer ID</b>
          <b>Payment ID</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
  // Convert the ISO string to a Date object and format it to YYYY-MM-DD
  const formattedPurchaseDate = new Date(item.PurchaseDate).toISOString().split('T')[0];

    return (
        <div key={index} className="purch-table-format">
            <p>{item.PurchaseID}</p>
            <p>{formattedPurchaseDate}</p> {/* Use the formatted date here */}
            <p>{item.CustomerID}</p>
            <p>{item.PaymentID}</p>
            <p className='btn-div'>
                <button onClick={() => handleDelete(item.PurchaseID)} className="btn-div">Delete</button>
            </p>
        </div>
        );
    })}
      </div>
    </div>
  );
}

export default Purchases;
