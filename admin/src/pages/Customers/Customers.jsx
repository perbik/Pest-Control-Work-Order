import React, { useEffect, useState } from 'react'
import './Customers.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

const Customers = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/customers')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []); // Add dependency array to run only once

  const handleDelete = (CustomerID) => {
    axios.delete(`http://localhost:8081/deletecust/${CustomerID}`)
      .then(res => {
        if (res.data.success) {
          setData(data.filter(item => item.CustomerID !== CustomerID));
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
          <b>Name</b>
          <b>Address</b>
          <b>Phone</b>
          <b>Email</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
          <div key={index} className="list-table-format">
            <p>{item.CustomerName}</p>
            <p>{item.CustomerAddress}</p>
            <p>{item.CustomerPhone}</p>
            <p>{item.CustomerEmail}</p>
            <p className='btn-div'>
              <Link to={`/updatecust/${item.CustomerID}`} className="btn-link">Update</Link>
              <button onClick={() => handleDelete(item.CustomerID)} className="btn-div">Delete</button>
            </p>
          </div>
          );
        })}
      </div>
    </div>
  );
}

export default Customers;
