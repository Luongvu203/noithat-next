"use client";

import Image from "next/image"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../styles/reset.css";
import "../styles/styles.css";

import { Product } from "../types";

export default function Bestseller() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/products");
                if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu");

                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi fetch sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (id: number) => {
        router.push(`/chitiet-sanpham/${id}`);
    };

    const handleAddToCart = (product: Product) => {
        console.log("Thêm sản phẩm vào giỏ hàng:", product);
    };

    return (
        <section className="bestseller">
            <h2>Sản phẩm bán chạy</h2>
            <div className="product-container">
                {loading ? (
                    <p>Đang tải sản phẩm...</p>
                ) : (
                    products.slice(0, 4).map((product) => (
                        <div key={product.id} className="product">
                            {/* Chỉ đặt sự kiện onClick cho ảnh và tên sản phẩm */}
                            <Image
                                src={product.image ? product.image : "/default.png"} // Đường dẫn đúng
                                alt={product.name}
                                onClick={() => handleProductClick(product.id)}
                                width={500} // Thêm width
                                height={500} // Thêm height
                                style={{ cursor: "pointer" }}
                            />
                            <h3 onClick={() => handleProductClick(product.id)} style={{ cursor: "pointer" }}>
                                {product.name}
                            </h3>
                            <p className="price">{Number(product.price).toLocaleString("vi-VN")} VND</p>
                            <p className="rating">★★★★★</p>
                            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    ))
                )}
            </div>
            <button className="view-more">Xem thêm</button>
        </section>
    );
}
