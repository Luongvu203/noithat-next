"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import "./sanpham.css";

// Định nghĩa kiểu dữ liệu
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string | null;
}
// Khai báo trạng thái
export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const router = useRouter();

  
  // Lấy dữ liệu sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Lỗi lấy dữ liệu');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        
         // Lấy danh sách danh mục duy nhất từ danh sách sản phẩm
        const uniqueCategories = [...new Set(data.map((product: Product) => product.category))] as string[];
        setCategories(uniqueCategories);
        setLoading(false);

      } catch (error) {
        console.error('Lỗi', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo bộ lọc========================================
  useEffect(() => {
    let result = [...products];
    
    // Lọc theo danh mục
    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Lọc theo giÁ
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under100":
          result = result.filter(product => parseFloat(product.price.replace(/[^\d.]/g, '')) < 100000);
          break;
        case "100to500":
          result = result.filter(product => {
            const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
            return price >= 100000 && price <= 500000;
          });
          break;
        case "500to1000":
          result = result.filter(product => {
            const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
            return price > 500000 && price <= 1000000;
          });
          break;
          case "1000to5000":
          result = result.filter(product => {
            const price = parseFloat(product.price.replace(/[^\d.]/g, ''));
            return price > 1000000 && price <= 5000000;
          });
          break;
        case "over5000":
          result = result.filter(product => parseFloat(product.price.replace(/[^\d.]/g, '')) > 5000000);
          break;
      }
    }
    
    //  search 
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
    setDisplayCount(8); // Đặt lại số lượng hiển thị khi bộ lọc thay đổi
  }, [selectedCategory, priceRange, searchTerm, products]);

  // "Xem thêm" tăng 4 sp
  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 4);
  };

  // Tính toán xem có nhiều sản phẩm hơn để tải không
  const hasMoreProducts = filteredProducts.length > displayCount;

// Bộ lọc sản phẩm
  // Danh mục
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  // GiáGiá
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceRange(e.target.value);
  };

  // Seach
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Xóa bộ lọc
  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange("all");
    setSearchTerm("");
  };

  return (
    <div>
      <Header />
      <main>
        <section className="product-section">
          <h2>Danh sách sản phẩm</h2>
          {/* =============== */}
          <div className="filter-container">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            
            <div className="dropdown-filters">
              <div className="filter-item">
                <label htmlFor="category-filter">Danh mục:</label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="filter-select"
                >
                  <option value="all">Tất cả</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-item">
                <label htmlFor="price-filter">Giá:</label>
                <select
                  id="price-filter"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="filter-select"
                >
                  <option value="all">Tất cả</option>
                  <option value="under100">Dưới 100.000đ</option>
                  <option value="100to500">100.000đ - 500.000đ</option>
                  <option value="500to1000">500.000đ - 1.000.000đ</option>
                  <option value="1000to5000">1.000.000đ - 5.000.000đ</option>
                  <option value="over5000">Trên 5.000.000đ</option>
                </select>
              </div>
              
              <button className="clear-filters-btn" onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            </div>
          </div>
          
          {/* ==================================== */}
          <div className="results-count">
            {filteredProducts.length} sản phẩm được tìm thấy
          </div>
          
          {loading ? (
            <div className="loading">Đang tải sản phẩm...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">Không có sản phẩm nào phù hợp với bộ lọc.</div>
          ) : (
            <>
              <div className="product-list">
                {filteredProducts.slice(0, displayCount).map((product) => (
                  <div key={product.id} className="product-item">
                    <a href={`/chitiet-sanpham`} className="product-link">
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="no-image">No image</div>
                      )}
                      <h3>{product.name}</h3>
                      <p className="product-price">
                        {product.price} 
                      </p>
                      <p className="product-category">{product.category}</p>
                      <p className="product-rating">★★★★★</p>
                    </a>
                    <button className="btn-add-to-cart">Thêm vào giỏ hàng</button>
                  </div>
                ))}
              </div>
              
              {hasMoreProducts && (
                <button className="load-more" onClick={handleLoadMore}>
                  Xem thêm
                </button>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}