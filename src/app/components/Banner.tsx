"use client";

import { useState, useEffect } from "react";
import "../styles/reset.css";
import "../styles/styles.css";


// Banner.tsx
export default function Banner() {
    return (
      <section className="banner">
        <div className="video-container">
          <video className="video-background" autoPlay muted loop>
            <source src="image/videonoithat.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
        <div className="overlay">
          <div className="content">
            <h1>Nội thất cho thế hệ mới</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum leo in enim placerat ultrices.
            </p>
            <a href="/san-pham" className="btn">Xem sản phẩm</a>
          </div>
        </div>
      </section>
    );
  }