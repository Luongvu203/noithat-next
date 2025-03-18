"use client";

import { useState, useEffect } from "react";
import "../styles/reset.css";
import "../styles/styles.css";


import NavMenu from "./js/NavMenu";


export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="header-container">
      <div className="container-pow">
        <div className="logo">Tempi</div>

        <div className="menu-toggle">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <NavMenu/>
        <nav className="navbar">
          <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/san-pham">Sản phẩm</a></li>
            <li><a href="#">Về chúng tôi</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Danh sách showroom</a></li>
            <li>
              {isLoggedIn ? (
                <a onClick={handleLogout} className="logout-btn">Đăng Xuất</a>
              ) : (
                <a href="/tai-khoan">Tài Khoản</a>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
