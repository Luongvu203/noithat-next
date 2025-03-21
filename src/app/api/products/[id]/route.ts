export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";

const prisma = new PrismaClient();

async function getProductId(req: Request) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  return id && !isNaN(parseInt(id)) ? parseInt(id) : null;
}

export async function GET(req: Request) {
  const productId = await getProductId(req);
  if (!productId) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true, price: true, category: true, image: true, description: true },
  });

  return product
    ? NextResponse.json(product)
    : NextResponse.json({ error: "Không có sản phẩm" }, { status: 404 });
}

export async function PUT(req: Request) {
  const productId = await getProductId(req);
  if (!productId) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const body = await req.json();
  const { name, price, category, image, description } = body;

  if (!name && !price && !category && !image && !description) {
    return NextResponse.json({ error: "Không có dữ liệu cập nhật" }, { status: 400 });
  }

  const existingProduct = await prisma.product.findUnique({ where: { id: productId } });
  if (!existingProduct) {
    return NextResponse.json({ error: "Không thấy sản phẩm" }, { status: 404 });
  }

  if (existingProduct.image && image && existingProduct.image !== image) {
    const oldImagePath = path.join(process.cwd(), "public", existingProduct.image);
    try { await fs.unlink(oldImagePath); } catch (err) { console.error("Lỗi xóa ảnh cũ:", err); }
  }

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: { name, price, category, image, description },
  });

  return NextResponse.json(updatedProduct);
}

export async function DELETE(req: Request) {
  const productId = await getProductId(req);
  if (!productId) {
    return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  if (product.image) {
    const imagePath = path.join(process.cwd(), "public", product.image);
    try { await fs.unlink(imagePath); } catch (err) { console.error("Lỗi xóa ảnh:", err); }
  }

  await prisma.product.delete({ where: { id: productId } });
  return NextResponse.json({ message: "Xóa thành công" });
}
