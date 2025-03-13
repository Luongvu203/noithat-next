import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kiểm tra tài khoản có tồn tại không
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Tài khoản không tồn tại!" }, { status: 401 });
    }

    // Kiểm tra mật khẩu
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ message: "Sai mật khẩu!" }, { status: 401 });
    }

    // Tạo JWT Token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token, role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Đã xảy ra lỗi!" }, { status: 500 });
  }
}
