import React, { useEffect, useState } from 'react';
import './Dashboard.css';
// If using react-icons, import the icons you need
import { FaProductHunt, FaUsers,  } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BiSolidCartAlt } from "react-icons/bi";

const MetricContainer = ({ icon, count, label }) => {
  // Convert count to a string with commas every three digits
  const formattedCount = count.toLocaleString();

  return (
    <div className="metric-container">
      <div className="icon">{icon}</div>
      <div className="count">{formattedCount}</div>
      <div className="label">{label}</div>
    </div>
  );
};

const Dashboard = () => {
  const [counts, setCounts] = useState({ productsCount: 0, customersCount: 0, salesTotal: 0, purchasesCount: 0});

  useEffect(() => {
    fetch('http://localhost:8081/dashboard')
      .then(response => response.json())
      .then(data => {
        setCounts(data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="metrics">
        <MetricContainer
          icon={<AiFillProduct className="react-icon" />} 
          count={counts.productsCount}
          label="Total Products"
        />
        <MetricContainer
          icon={<FaUsers className="react-icon" />} 
          count={counts.customersCount}
          label="Total Customers"
        />
        <MetricContainer
          icon={<RiMoneyDollarCircleFill className="react-icon" />} 
          count={counts.salesTotal}
          label="Total Sales"
        />
        <MetricContainer
          icon={<BiSolidCartAlt className="react-icon"  />} 
          count={counts.purchasesCount}
          label="Total Purchases"
        />
        
      </div>
    </div>
  );
};

export default Dashboard;