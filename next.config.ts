import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Thêm cấu hình này để phục vụ các file tĩnh từ thư mục uploads
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/public/uploads/:path*',
      },
    ];
  },
  
  // Hoặc bạn có thể sử dụng publicRuntimeConfig
  publicRuntimeConfig: {
    staticFolder: '/public',
  },
};

export default nextConfig;