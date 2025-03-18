// src/app/admin/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Không thể tải sản phẩm');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tìm sản phẩm:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="tab-content">
      <h2>Tổng quan</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Tổng số sản phẩm</h3>
            <p className="stat-value">{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Danh mục</h3>
            <p className="stat-value">{new Set(products.map(p => p.category)).size}</p>
          </div>
          <div className="stat-card">
            <h3>Đơn hàng mới</h3>
            <p className="stat-value">0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;