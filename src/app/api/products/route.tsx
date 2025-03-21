// File: /app/api/products/route.ts
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lấy tất cả các sản  phẩm 
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      // Sắp xếp theo id giảm dần (mới nhất lên trước)
      orderBy: {
        id: 'desc',
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error('Lỗi khi tìm sản phẩm:', error);
    return NextResponse.json(
      { error: 'Không thể tải sản phẩm' },
      { status: 500 }
    );
  }
}

// POST Thêm sản phẩm mới
export async function POST(request: Request) {
  try {
    // Lấy dữ liệu từ request
    const body = await request.json(); 
    const { name, price, category, image } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Thiếu các trường bắt buộc' },
        { status: 400 }
      );
    }
    // Thêm sản phẩm vào database
    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        image: image || null,
      },
    });
    // Trả về sản phẩm vừa tạo
    return NextResponse.json(product);
    // Xử lý lỗi
  } catch (error) {
    console.error('Lỗi tạo sản phẩm:', error);
    return NextResponse.json(
      { error: 'Không tạo được sản phẩm' },
      { status: 500 }
    );
  }
}