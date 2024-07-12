import React, { useEffect, useState } from 'react'
import './Customers.css'
import axios from 'axios'

const Customers = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:8081/customers')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
    })

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
        {data.map((item,index) => {
          return (
            <div key={index} className="list-table-format">
              <p>{item.CustomerName}</p>
              <p>{item.CustomerAddress}</p>
              <p>{item.CustomerPhone}</p>
              <p>{item.CustomerEmail}</p>
              <p className='btn-div'>
                <button className="btn">Update</button>
                <button className="btn">Delete</button>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Customers
