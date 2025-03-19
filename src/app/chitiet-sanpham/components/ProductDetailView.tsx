// File: app/chitiet-sanpham/components/ProductDetailView.tsx
// ===========hiển thị thông tin chi tiết về một sản phẩm================
import { useState } from "react";
import { Product } from "../../types";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);

  // Xử lý tăng số lượng
  const increaseQuantity = () => {
    if (product?.stock && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  // Xử lý giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <section className="product-detail-main">
      <div className="product-image-container">
        {product.image ? (
          <img src={product.image} alt={product.name} className="product-detail-image" />
        ) : (
          <div className="no-image-large">Không có hình ảnh</div>
        )}
      </div>

      <div className="product-info">
        <h1 className="product-detail-name">{product.name}</h1>
        <div className="product-detail-meta">
          <div className="product-category">Danh mục: {product.category}</div>
          <div className="product-sku">Mã sản phẩm: SP{product.id}</div>
        </div>

        <div className="product-detail-price">
          {Number(product.price).toLocaleString("vi-VN")} VND
        </div>


        <div className="quantity-selector">
          <button onClick={decreaseQuantity} className="quantity-btn">-</button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="quantity-input"
          />
          <button onClick={increaseQuantity} className="quantity-btn">+</button>
        </div>

        <div className="product-actions">
          <button className="add-to-cart-btn" >
            Thêm vào giỏ hàng
          </button>
          <button className="buy-now-btn">
            Mua ngay
          </button>
        </div>
      </div>
    </section>
  );
}