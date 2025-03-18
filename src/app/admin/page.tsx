// src/app/admin/page.tsx - Main admin page
"use client";

import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Products from './components/Products/Products';
import Orders from './components/Orders';
import Users from './components/Users';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './admin.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="main-content">
        <Header />
        
        {/* Tab Content */}
        <div className="content-container">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'products' && <Products />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'users' && <Users />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;