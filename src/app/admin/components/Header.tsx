// src/app/admin/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." />
      </div>
      <div className="user-info">
        <span>Xin Chào Admin</span>
      </div>
    </header>
  );
};

export default Header;