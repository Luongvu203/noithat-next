// src/app/admin/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const handleLogout = () => {
        // Xóa token trong localStorage (nếu dùng JWT)
        localStorage.removeItem("token");
        // Chuyển hướng về trang đăng nhập
        window.location.href = "/";
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>Nội Thất Admin</h1>
            </div>
            <ul className="menu">
                <li
                    className={activeTab === 'dashboard' ? 'active' : ''}
                    onClick={() => setActiveTab('dashboard')}
                >
                    Tổng quan
                </li>
                <li
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => setActiveTab('products')}
                >
                    Sản phẩm
                </li>
                <li
                    className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTab('orders')}
                >
                    Đơn hàng
                </li>
                <li
                    className={activeTab === 'users' ? 'active' : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Người dùng
                </li>
                <li
                    className={activeTab === 'settings' ? 'active' : ''}
                    onClick={() => setActiveTab('settings')}
                >
                    Cài đặt
                </li>
            </ul>
            <div className="sidebar-footer">
                <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
            </div>
        </div>
    );
};

export default Sidebar;