"use client";

import "./taikhoan.css";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGooglePlusG, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export default function LoginSignup() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const router = useRouter();

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý đăng nhập
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Đăng nhập thất bại!");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Chuyển hướng dựa theo vai trò
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.back();
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý đăng ký
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Đăng ký thất bại!");

      alert("Đăng ký thành công! Hãy đăng nhập.");
      setIsRightPanelActive(false);
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Register</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/images/logo-ico.png" />
      </Head>

      <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
        {/* Form đăng ký */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignup}>
            <h1 className="h1-hello">Tạo Tài Khoản</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
            <span className="wow">Hoặc sử dụng email và mật khẩu của bạn</span>
            <input name="name" type="text" placeholder="Name" required onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng Ký"}</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>

        {/* Form đăng nhập */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1 className="h1-hello">Đăng Nhập</h1>
            <div className="social-icons">
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faGooglePlusG} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </div>
            <span className="wow">Hoặc sử dụng email và mật khẩu của bạn</span>
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
            <a href="#">Bạn quên mật khẩu?</a>
            <button type="submit" disabled={loading}>{loading ? "Đang xử lý..." : "Đăng Nhập"}</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>

        {/* Toggle panel */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Chào Mừng Trở Lại</h1>
              <p>Đăng nhập bằng tài khoản và mật khẩu của bạn</p>
              <button className="hidden" id="login" onClick={() => setIsRightPanelActive(false)}>
                Đăng Nhập
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Chào bạn!!</h1>
              <p>Đăng ký tài khoản để sử dụng nhiều hơn các dịch vụ</p>
              <button className="hidden" id="register" onClick={() => setIsRightPanelActive(true)}>
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-back-home">
            {/* Nút quay lại */}
            <button className="back-button" onClick={() => router.back()}>
                Quay lại
            </button>
      </div>
    </>
  );
}
