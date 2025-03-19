// Gọi api............

import { Product } from "../../types";

// Lấy thông tin chi tiết sản pham
export async function fetchProductDetails(productId: string | string[]): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error('Không thể lấy thông tin sản phẩm');
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy thông tin sản phẩm:', error);
    throw error;
  }
}

// Lấy danh sách sản phẩm liên quan
export async function fetchRelatedProducts(category: string, currentProductId: number): Promise<Product[]> {
  try {
    const response = await fetch(`/api/products?category=${category}`);
    if (!response.ok) throw new Error('Không thể lấy danh sách sản phẩm liên quan');

    const products: Product[] = await response.json();
    return products.filter(item => item.id !== currentProductId).slice(0, 4);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm liên quan:', error);
    return [];
  }
}
