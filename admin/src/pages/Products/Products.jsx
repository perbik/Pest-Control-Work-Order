import React, { useEffect, useState } from 'react';
import './Products.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/products')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (ProductID) => {
    axios.delete(`http://localhost:8081/deleteprod/${ProductID}`)
      .then(res => {
        if (res.data.success) {
          setData(data.filter(item => item.ProductID !== ProductID));
          navigate('/products'); // You may remove this line if you don't want to navigate away after deletion
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='prod add flex-col'>
      <p>Products List</p>
      <div className="prod-table">
        <div className="prod-table-format title">
          <b>ID</b>
          <b>Image</b>
          <b>Product Name</b>
          <b>Target Pest Type</b>
          <b>Product Price</b>
          <b>Action</b>
        </div>
        {data.map((item, index) => {
          return (
            <div key={index} className="prod-table-format content">
              <p>{item.ProductID}</p>
              <img src={`http://localhost:8081/uploads/${item.ProdImage}`} alt="product" />
              <p>{item.ProductName}</p>
              <p>{item.TargetPestType}</p>
              <p>{item.ProductUnitPrice}</p>
              <p className='btn-div'>
                <Link to={`/updateprod/${item.ProductID}`} className="btn-link">Update</Link>
                <button onClick={() => handleDelete(item.ProductID)} className="btn-div">Delete</button>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
