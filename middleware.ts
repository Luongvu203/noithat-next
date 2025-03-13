import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Khóa bí mật để xác thực token (phải giống với khóa đã dùng khi tạo token)
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Lấy token từ cookie

  if (!token) {
    return NextResponse.redirect(new URL("/tai-khoan", req.url)); // Chuyển hướng đến trang login nếu không có token
  }

  try {
    jwt.verify(token, SECRET_KEY); // Kiểm tra token có hợp lệ không
    return NextResponse.next(); // Nếu hợp lệ, cho phép truy cập
  } catch (error) {
    return NextResponse.redirect(new URL("/tai-khoan", req.url)); // Nếu lỗi, chuyển hướng đến trang login
  }
}

// Áp dụng middleware cho các route cần bảo vệ
export const config = {
  matcher: ["/admin/:path*"], // Middleware sẽ chạy với tất cả route con của /admin
};
