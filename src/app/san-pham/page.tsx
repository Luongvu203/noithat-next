import Header from "../components/Header";
import "./sanpham.css";

const products = [
  { id: 1, name: "Sản phẩm 1", price: "100.000 đ", discount: "-30%", image: "image/anh7.png" },
  { id: 2, name: "Sản phẩm 2", price: "100.000 đ", discount: "-30%", image: "image/anh8.png" },
  { id: 3, name: "Sản phẩm 3", price: "100.000 đ", discount: "-30%", image: "image/anh9.png" },
  { id: 4, name: "Sản phẩm 4", price: "100.000 đ", discount: "-30%", image: "image/anh10.png" },
];

export default function ProductPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="product-section">
          <h2>Danh sách sản phẩm</h2>
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="product-price">
                  {product.price} <span className="product-discount">{product.discount}</span>
                </p>
                <p className="product-rating">★★★★★</p>
              </div>
            ))}
          </div>
          <button className="load-more">Xem thêm</button>
        </section>
      </main>
    </div>
  );
}
