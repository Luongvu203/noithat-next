// File: app/chitiet-sanpham/components/ProductTabs.tsx
import { useState } from "react";
import { Product } from "../../types";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="product-detail-tabs">
      <div className="tab-header">
        <button 
          className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Mô tả sản phẩm
        </button>
        <button 
          className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          Thông số kỹ thuật
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Đánh giá
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="description-content">
            {product.description || 'Chưa có thông tin mô tả cho sản phẩm này.'}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="specifications-content">
            {product.specifications || 'Chưa có thông số kỹ thuật cho sản phẩm này.'}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-content">
            <p>Chưa có đánh giá nào cho sản phẩm này.</p>
            <button className="write-review-btn">Viết đánh giá</button>
          </div>
        )}
      </div>
    </section>
  );
}