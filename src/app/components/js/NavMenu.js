import { useEffect } from "react";

const NavMenu = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const menuToggle = document.querySelector(".menu-toggle");
      const navbar = document.querySelector(".navbar");

      if (menuToggle && navbar) {
        // Hiện menu khi click vào nút menu-toggle
        menuToggle.addEventListener("click", (e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
          navbar.classList.toggle("active");
        });

        // Ẩn menu khi click ra ngoài
        document.addEventListener("click", (e) => {
          if (!navbar.contains(e.target)) {
            navbar.classList.remove("active");
          }
        });
      }
    }
  }, []);

  return null; // Thay thế bằng JSX nếu có
};

export default NavMenu;
