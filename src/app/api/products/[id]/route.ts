export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

// GET lấy sản phẩm theo ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true, name: true, price: true, category: true, image: true, description: true }, 
    });
    
    if (!product) {
      return NextResponse.json({ error: "Không có sản phẩm" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Không thể tải sản phẩm:", error);
    return NextResponse.json({ error: "Không thể tải sản phẩm" }, { status: 500 });
  }
}

// PUT cập nhật sản phẩm theo ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }
    const productId = parseInt(id);

    const body = await request.json();
    const { name, price, category, image, description } = body;

    if (!name && !price && !category && !image && !description) {
      return NextResponse.json({ error: "Không có dữ liệu cập nhật" }, { status: 400 });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Không thấy sản phẩm" }, { status: 404 });
    }

    if (existingProduct.image && image && existingProduct.image !== image) {
      const oldImagePath = path.join(process.cwd(), "public", existingProduct.image);
      try {
        await fs.unlink(oldImagePath);
      } catch (err) {
        console.error("Lỗi xóa ảnh cũ:", err);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { 
        name: name !== undefined ? name : undefined,
        price: price !== undefined ? price : undefined,
        category: category !== undefined ? category : undefined,
        image: image !== undefined ? image : undefined,
        description: description !== undefined ? description : undefined
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error);
    return NextResponse.json({ error: "Không cập nhật được sản phẩm" }, { status: 500 });
  }
}

// DELETE xóa sản phẩm theo ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    if (product.image) {
      const imagePath = path.join(process.cwd(), "public", product.image);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.error("Lỗi xóa ảnh:", err);
      }
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Xóa thành công" });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm:", error);
    return NextResponse.json({ error: "Không xóa được sản phẩm" }, { status: 500 });
  }
}