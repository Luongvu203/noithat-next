"use client";

import React, { useState, useRef } from 'react';
import { Product, NewProduct, EditingProduct } from '../../types';
import { useProducts } from './useProducts';
import { ProductList, AddProductForm, EditProductForm } from './ProductComponents';

const Products: React.FC = () => {
    const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
    const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '', category: '' });
    const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
    const [newProductImage, setNewProductImage] = useState<File | null>(null);
    const [editProductImage, setEditProductImage] = useState<File | null>(null);
    const editFormRef = useRef<HTMLDivElement | null>(null);

    // Handle add product
    const handleAddProduct = async () => {
        const success = await addProduct(newProduct, newProductImage);
        if (success) {
            setNewProduct({ name: '', price: '', category: '' });
            setNewProductImage(null);
        }
    };

    // Handle update product
    const handleUpdateProduct = async () => {
        if (editingProduct) {
            const success = await updateProduct(editingProduct, editProductImage);
            if (success) {
                setEditingProduct(null);
                setEditProductImage(null);
            }
        }
    };

    // Handle edit product
    const handleEditProduct = (product: Product) => {
        setEditingProduct({ ...product });
        setEditProductImage(null);
        // Scroll to edit form after selecting product to edit
        setTimeout(() => {
            if (editFormRef.current) {
                editFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    // Handle cancel new product
    const handleCancelNewProduct = () => {
        setNewProduct({ name: "", price: "", category: "", imagePreview: "" });
        setNewProductImage(null);
    };

    return (
        <div className="tab-content">
            <h2>Quản lý sản phẩm</h2>

            {/* Add product form */}
            <AddProductForm 
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                newProductImage={newProductImage}
                setNewProductImage={setNewProductImage}
                onAdd={handleAddProduct}
                onCancel={handleCancelNewProduct}
            />

            {/* Edit product form */}
            <EditProductForm 
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                editProductImage={editProductImage}
                setEditProductImage={setEditProductImage}
                onUpdate={handleUpdateProduct}
                onCancel={() => setEditingProduct(null)}
                formRef={editFormRef}
            />

            {/* Products list */}
            <ProductList 
                products={products}
                loading={loading}
                onEdit={handleEditProduct}
                onDelete={deleteProduct}
            />
        </div>
    );
};

export default Products;