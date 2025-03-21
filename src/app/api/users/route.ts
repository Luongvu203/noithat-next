export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// API lấy danh sách người dùng
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lấy dữ liệu!" }, { status: 500 });
  }
}
