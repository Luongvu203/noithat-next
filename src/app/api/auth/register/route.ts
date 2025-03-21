export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "Email đã tồn tại!" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ message: "Đăng ký thành công!", user: newUser });
    } catch (error) {
        return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
    }
}
