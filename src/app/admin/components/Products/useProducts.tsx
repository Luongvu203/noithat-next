// useProducts.ts
import { useState, useEffect } from 'react';
import { Product, NewProduct, EditingProduct } from '../../../types';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch products from database
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error('Không thể tải sản phẩm');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi tìm sản phẩm:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Add new product
    const addProduct = async (newProduct: NewProduct, newProductImage: File | null) => {
        if (newProduct.name && newProduct.price && newProduct.category) {
            try {
                // Upload image first if available
                let imagePath = null;
                if (newProductImage) {
                    const formData = new FormData();
                    formData.append('file', newProductImage);

                    const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error('Không tải được hình ảnh lên');
                    }

                    const uploadData = await uploadResponse.json();
                    imagePath = uploadData.filePath;
                }

                // Create product with image path
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
                    throw new Error('Không thêm được sản phẩm');
                }

                const addedProduct = await response.json();
                setProducts([...products, addedProduct]);
                
                // Show notification
                alert("Thêm sản phẩm thành công!");
                return true;
            } catch (error) {
                console.error('Lỗi khi thêm sản phẩm:', error);
                return false;
            }
        }
        return false;
    };

    // Update product
    const updateProduct = async (editingProduct: EditingProduct, editProductImage: File | null) => {
        if (editingProduct && editingProduct.name && editingProduct.price && editingProduct.category) {
            try {
                console.log('Đang cập nhật sản phẩm:', editingProduct);

                // Prepare product data for update
                const productData = {
                    name: editingProduct.name,
                    price: editingProduct.price,
                    category: editingProduct.category,
                    image: editingProduct.image,
                };

                // Upload new image if provided
                if (editProductImage) {
                    console.log('Đang tải lên hình ảnh mới');
                    const formData = new FormData();
                    formData.append('file', editProductImage);

                    const uploadResponse = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (!uploadResponse.ok) {
                        throw new Error('Không tải được hình ảnh lên');
                    }

                    const uploadData = await uploadResponse.json();
                    productData.image = uploadData.filePath;
                }

                console.log('Gửi dữ liệu cập nhật:', productData);

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
                    throw new Error(`Không cập nhật được sản phẩm: ${errorData.error || response.statusText}`);
                }

                const updatedProduct = await response.json();

                // Update products state with updated product
                setProducts(products.map(p =>
                    p.id === editingProduct.id ? updatedProduct : p
                ));

                // Show notification
                alert("Sửa thành công!");
                return true;
            } catch (error) {
                console.error('Error updating product:', error);
                return false;
            }
        }
        return false;
    };

    // Delete product
    const deleteProduct = async (id: number) => {
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            setProducts(products.filter(p => p.id !== id));

            // Show notification
            alert("Xóa sản phẩm thành công!");
            return true;
        } catch (error) {
            console.error('Error deleting product:', error);
            return false;
        }
    };

    return {
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct
    };
}