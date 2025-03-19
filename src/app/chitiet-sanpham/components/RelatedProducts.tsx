//app/chitiet-sanpham/components/RelatedProducts.tsx
//==================== hiển thị danh sách sản phẩm liên quan=========================
import { Product } from "../../types";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  // Chuyển hướng đến trang chi tiết sản phẩm liên quan
  const navigateToProduct = (productId: number) => {
    window.location.href = `/chitiet-sanpham/${productId}`;
  };

  return (
    <section className="related-products">
      <h2>Sản phẩm liên quan</h2>
      <div className="related-products-list">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="related-product-item"
            onClick={() => navigateToProduct(product.id)}
          >
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="no-image">No image</div>
            )}
            <h3>{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}