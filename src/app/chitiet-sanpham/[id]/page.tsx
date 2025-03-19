"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import ProductDetailView from "../components/ProductDetailView";
import ProductTabs from "../components/ProductTabs";
import RelatedProducts from "../components/RelatedProducts";
import { fetchProductDetails, fetchRelatedProducts } from "../services/productService";
import { Product } from "../../types";
import "../chitiet-sanpham.css";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        setLoading(true);
        
        if (productId) {
          // Lấy thông tin chi tiết sản phẩm
          const productData = await fetchProductDetails(productId);
          setProduct(productData);
          
          // Lấy sản phẩm liên quan
          if (productData?.category) {
            const related = await fetchRelatedProducts(productData.category, productData.id);
            setRelatedProducts(related);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Lỗi:", error);
        setLoading(false);
      }
    };

    loadProductData();
  }, [productId]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading-container">
          <div className="loading">Đang tải thông tin sản phẩm...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="error-container">
          <div className="error-message">Không tìm thấy sản phẩm</div>
          <a href="/san-pham" className="back-button">Quay lại trang sản phẩm</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="product-detail-container">
        <div className="breadcrumb">
          <a href="/">Trang chủ</a> &gt; <a href="/san-pham">Sản phẩm</a> &gt; <span>{product.name}</span>
        </div>
        {/* Hiển thị ảnh, giá, mô tả sản phẩm. */}
        <ProductDetailView product={product} />
        {/* Hiển thị tab chi tiết, đánh giá. */}
        <ProductTabs product={product} />
        {/* Nếu có sản phẩm liên quan thì hiển thị. */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </main>
    </div>
  );
}