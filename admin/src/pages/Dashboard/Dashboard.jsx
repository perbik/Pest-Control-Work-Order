import React, { useEffect, useState } from 'react';
import './Dashboard.css';
// If using react-icons, import the icons you need
import { FaProductHunt, FaUsers } from 'react-icons/fa';

const MetricContainer = ({ icon, count, label }) => {
  return (
    <div className="metric-container">
      <div className="icon">{icon}</div>
      <div className="count">{count}</div>
      <div className="label">{label}</div>
    </div>
  );
};

const Dashboard = () => {
  const [counts, setCounts] = useState({ productsCount: 0, customersCount: 0 });

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
          icon={<FaProductHunt />} // Replace with <FaProductHunt /> if using react-icons
          count={counts.productsCount}
          label="Total Products"
        />
        <MetricContainer
          icon={<FaUsers />} // Replace with <FaUsers /> if using react-icons
          count={counts.customersCount}
          label="Total Customers"
        />
      </div>
    </div>
  );
};

export default Dashboard;