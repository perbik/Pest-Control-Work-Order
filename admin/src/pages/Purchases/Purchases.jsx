import React, { useEffect, useState } from 'react'
import './Customers.css'
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
          navigate('/customers');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='list add flex-col'>
      <p>Customers List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>ID</b>
          <b>Purchase Date</b>
          <b>Customer ID</b>
          <b>Payment ID</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
          <div key={index} className="list-table-format">
            <p>{item.PurchaseID}</p>
            <p>{item.PurchaseDate}</p>
            <p>{item.CustomerID}</p>
            <p>{item.PaymentID}</p>
            <p className='btn-div'>
              <Link to={`/updatecust/${item.PurchaseID}`} className="btn-link">Update</Link>
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
