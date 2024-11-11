// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css';
import ProductList from './ProductList';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <ProductList />
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
