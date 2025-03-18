import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET lấy sản phẩm theo ID
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Lỗi ID' },
        { status: 400 }
      );
    }
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Không có sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Không thể tải sản phẩm:', error);
    return NextResponse.json(
      { error: 'Không thể tải sản phẩm' },
      { status: 500 }
    );
  }
}

// PUT Cập nhật sản phẩm theo ID
export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'Lỗi lấy ID' },
        { status: 400 }
      );
    }
    // Lấy dữ liệu từ client
    const body = await request.json();
    const { name, price, category, image } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Thiếu trường' },
        { status: 400 }
      );
    }

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Không thấy sản phẩm' },
        { status: 404 }
      );
    }

    // Xóa ảnh cũ nếu có và ảnh mới khác ảnh cũ
    if (existingProduct.image && image && existingProduct.image !== image) {
      const oldImagePath = path.join(process.cwd(), 'public', existingProduct.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Update sản phẩm
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        price,
        category,
        image: image || null,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Lỗi cập nhật sản phẩm:', error);
    return NextResponse.json(
      { error: 'Không cập nhật được sản phẩm' },
      { status: 500 }
    );
  }
}

// DELETE - Xóa sản phẩm theo ID
export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { error: 'ID sản phẩm không hợp lệ' },
        { status: 400 }
      );
    }

    // Kiểm tra sản phẩm có tồn tại không
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    // Xóa ảnh của sản phẩm nếu có
    if (product.image) {
      const imagePath = path.join(process.cwd(), 'public', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Xóa sản phẩm khỏi database
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: 'Xóa thành công' });
  } catch (error) {
    console.error('Lỗi xóa sản phẩm:', error);
    return NextResponse.json(
      { error: 'Không xóa được sản phẩm' },
      { status: 500 }
    );
  }
}
