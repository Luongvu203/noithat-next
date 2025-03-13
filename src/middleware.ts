import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Bạn chưa đăng nhập!" }, { status: 401 });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch {
        return NextResponse.json({ error: "Token không hợp lệ!" }, { status: 403 });
    }
}

// Áp dụng middleware cho các API cần bảo vệ
export const config = {
    matcher: ["/api/users/:path*"], 
};
