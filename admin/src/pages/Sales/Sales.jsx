import React, { useEffect, useState } from 'react'
import './Sales.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Sales = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/sales')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []); // Add dependency array to run only once

  const handleDelete = (PurchaseID, ProductID) => {
    axios.delete(`http://localhost:8081/deletesales/${PurchaseID}/${ProductID}`)
      .then(res => {
        if (res.data.success) {
          // Update the state to remove the item with both PurchaseID and ProductID
          setData(data.filter(item => item.PurchaseID !== PurchaseID || item.ProductID !== ProductID));
          navigate('/sales');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='sales add flex-col'>
      <p>Customers List</p>
      <div className="sales-table">
        <div className="sales-table-format title">
          <b>Purchase ID</b>
          <b>Product ID</b>
          <b>Quantity</b>
          <b>Amount</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
  return (
    <div key={index} className="sales-table-format">
      <p>{item.PurchaseID}</p>
      <p>{item.ProductID}</p>
      <p>{item.ProductQuantity}</p>
      <p>{item.ProductAmount}</p>
      <p className='btn-div'>
        <Link to={`/updatesales/${item.PurchaseID}`} className="btn-link">Update</Link>
        <button onClick={() => handleDelete(item.PurchaseID, item.ProductID)} className="btn-div">Delete</button>
      </p>
    </div>
  );
})}
      </div>
    </div>
  );
}

export default Sales;
