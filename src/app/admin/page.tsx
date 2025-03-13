"use client";
import React, { useState, useEffect } from 'react';
import './admin.css';

// Define TypeScript interfaces
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string | null;
}

interface NewProduct {
  name: string;
  price: string;
  category: string;
  imagePreview?: string;
}

interface EditingProduct extends Product {
  imagePreview?: string;
}

const handleLogout = () => {
  // Xóa token trong localStorage (nếu dùng JWT)
  localStorage.removeItem("token");

  // Hoặc nếu có API đăng xuất, có thể gọi:
  // await fetch("/api/logout", { method: "POST" });

  // Chuyển hướng về trang đăng nhập
  window.location.href = "/"; 
};


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '', category: '' });
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newProductImage, setNewProductImage] = useState<File | null>(null);
  const [editProductImage, setEditProductImage] = useState<File | null>(null);

  // Fetch products from the database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add new product
  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      try {
        // Upload ảnh trước nếu có
        let imagePath = null;
        if (newProductImage) {
          const formData = new FormData();
          formData.append('file', newProductImage);
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
      
          if (!uploadResponse.ok) {
            throw new Error('Failed to upload image');
          }
      
          const uploadData = await uploadResponse.json();
          imagePath = uploadData.filePath;
        }
        
        // Tạo sản phẩm với đường dẫn ảnh
        const productData = {
          name: newProduct.name,
          price: newProduct.price,
          category: newProduct.category,
          image: imagePath,
        };
        
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
  
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setNewProduct({ name: '', price: '', category: '' });
        setNewProductImage(null);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  // Update product
  const handleUpdateProduct = async () => {
    if (editingProduct && editingProduct.name && editingProduct.price && editingProduct.category) {
      try {
        console.log('Updating product:', editingProduct);
        
        // Prepare product data for update
        const productData = {
          name: editingProduct.name,
          price: editingProduct.price,
          category: editingProduct.category,
          image: editingProduct.image,
        };
        
        // Upload the new image if provided
        if (editProductImage) {
          console.log('Uploading new image');
          const formData = new FormData();
          formData.append('file', editProductImage);
          
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
      
          if (!uploadResponse.ok) {
            throw new Error('Failed to upload image');
          }
      
          const uploadData = await uploadResponse.json();
          productData.image = uploadData.filePath;
        }
        
        console.log('Sending update data:', productData);
        
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API error:', errorData);
          throw new Error(`Failed to update product: ${errorData.error || response.statusText}`);
        }

        const updatedProduct = await response.json();
        
        // Update products state with the updated product
        setProducts(products.map(p => 
          p.id === editingProduct.id ? updatedProduct : p
        ));
        
        // Reset editing state
        setEditingProduct(null);
        setEditProductImage(null);
        
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setEditProductImage(null);
  };

  // Handle file change for editing product
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const imageUrl = URL.createObjectURL(file);
      setEditingProduct({ ...editingProduct, imagePreview: imageUrl });
      setEditProductImage(file);
    }
  };

  // Render products tab
  const renderProductsTab = () => {
    return (
      <div className="tab-content">
        <h2>Quản lý sản phẩm</h2>
        
        {/* Add product form */}
<div className="add-product-form">
  <h3>Thêm sản phẩm mới</h3>
  <div className="form-group">
    <input
      type="text"
      placeholder="Tên sản phẩm"
      value={newProduct.name}
      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
    />
  </div>
  <div className="form-group">
    <input
      type="text"
      placeholder="Giá"
      value={newProduct.price}
      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
    />
  </div>
  <div className="form-group">
    <input
      type="text"
      placeholder="Danh mục"
      value={newProduct.category}
      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
    />
  </div>

  <div className="form-group-image">
    <label htmlFor="file-upload" className="form-group-image">
      <span>📷 Nhấn để tải ảnh lên</span>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            // Hiển thị preview
            const reader = new FileReader();
            reader.onloadend = () => {
              setNewProduct({ ...newProduct, imagePreview: reader.result as string });
            };
            reader.readAsDataURL(file);

            // Lưu file vào state để upload sau
            setNewProductImage(file);
          }
        }}
      />
    </label>

    {newProduct.imagePreview && (
      <div className="image-preview">
        <img src={newProduct.imagePreview} alt="Xem trước" className="preview-image" />
      </div>
    )}
  </div>

  <div className="button-group">
    <button className="btn-add" onClick={handleAddProduct}>Thêm sản phẩm</button>
    <button 
      className="btn-cancel" 
      onClick={() => {
        setNewProduct({ name: "", price: "", category: "", imagePreview: "" });
        setNewProductImage(null);
      }}
    >
      Hủy
    </button>
  </div>
</div>


        {/* Edit product form */}
        {editingProduct && (
          <div className="edit-product-form">
            <h3>Chỉnh sửa sản phẩm</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Giá"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Danh mục"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
              />
            </div>
            <div className="form-group-image">
              <label htmlFor="edit-file-upload" className="file-upload-label">
              <span>📷 Cập nhật hình ảnh</span>
                <input     
                  id="edit-file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                />
              </label>

              {editingProduct.image && !editingProduct.imagePreview && (
                <div className="image-preview">
                  <img src={editingProduct.image} alt="Xem trước" className="preview-image" />
                </div>
              )}
              {editingProduct.imagePreview && (
                <div className="image-preview">
                  <img src={editingProduct.imagePreview} alt="Xem trước" className="preview-image" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button className="btn-update" onClick={handleUpdateProduct}>Cập nhật</button>
              <button className="btn-cancel" onClick={() => setEditingProduct(null)}>Hủy</button>
            </div>
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className="products-list">
          <h3>Danh sách sản phẩm</h3>
          {loading ? (
            <p>Đang tải...</p>
          ) : products.length === 0 ? (
            <p>Không có sản phẩm nào</p>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th>Hình ảnh</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      {product.image ? (
                        <img src={product.image} alt="Ảnh sản phẩm" className="table-image" />
                      ) : (
                        <span className="no-image">Không có ảnh</span>
                      )}
                    </td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEditProduct(product)}>Sửa</button>
                      <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  // Render dashboard tab
  const renderDashboardTab = () => {
    return (
      <div className="tab-content">
        <h2>Tổng quan</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Tổng số sản phẩm</h3>
            <p className="stat-value">{products.length}</p>
          </div>
          <div className="stat-card">
            <h3>Danh mục</h3>
            <p className="stat-value">{new Set(products.map(p => p.category)).size}</p>
          </div>
          <div className="stat-card">
            <h3>Đơn hàng mới</h3>
            <p className="stat-value">0</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>Nội Thất Admin</h1>
        </div>
        <ul className="menu">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            Tổng quan
          </li>
          <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            Sản phẩm
          </li>
          <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            Đơn hàng
          </li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            Người dùng
          </li>

          <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            Cài đặt
          </li>
        </ul>
        <div className="sidebar-footer">
  <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
</div>

      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <div className="search-bar">
            <input type="text" placeholder="Tìm kiếm..." />
          </div>
          <div className="user-info">
            <span>Xin Chào Admin</span>
          </div>
        </header>
        
        {/* Tab Content */}
        <div className="content-container">
          {activeTab === 'dashboard' && renderDashboardTab()}
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'orders' && <div className="tab-content"><h2>Quản lý đơn hàng</h2></div>}
          {activeTab === 'users' && <div className="tab-content"><h2>Quản lý người dùng</h2></div>}
          {activeTab === 'settings' && <div className="tab-content"><h2>Cài đặt hệ thống</h2></div>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;