"use client";

import { useState, useEffect } from "react";
import "../styles/reset.css";
import "../styles/styles.css";

export default function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="company-info">
                    <h3>CÔNG TY CỔ PHẦN ABC</h3>
                    <p>
                        <i className="fas fa-home"></i> Đường ... Phường ... Quận ...
                        Thành phố ...
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i> abc@example.com
                    </p>
                    <p>
                        <i className="fas fa-phone"></i> 0987654321
                    </p>
                    <p>
                        <i className="fas fa-fax"></i> +84 24 9999 9999
                    </p>
                </div>
                <div className="shopping-guide">
                    <h3>HƯỚNG DẪN MUA HÀNG</h3>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Khu vực giao hàng</p>
                    <p>Phương thức thanh toán</p>
                    <p>Chính sách trả hàng và hoàn tiền</p>
                    <p>Chính sách bảo mật thông tin</p>
                </div>
                <div className="newsletter">
                    <h3>ĐĂNG KÝ NHẬN TIN</h3>
                    <label htmlFor="email">* Email của bạn</label>
                    <input
                        id="emai-in-fa"
                        type="email"
                        placeholder="Nhập email của bạn"
                    />
                    <button type="submit">Gửi</button>
                    <div className="social-icons">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-tiktok"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-facebook-messenger"></i>
                        <i className="fab fa-twitter"></i>
                    </div>
                </div>
            </div>
        </footer>
    );
}