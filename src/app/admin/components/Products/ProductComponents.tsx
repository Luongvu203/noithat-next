// ProductComponents.tsx
import React from 'react';
import { Product, NewProduct, EditingProduct } from '../../types';

interface ProductListProps {
    products: Product[];
    loading: boolean;
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, loading, onEdit, onDelete }) => {
    return (
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
                                    <button className="btn-edit" onClick={() => onEdit(product)}>Sửa</button>
                                    <button className="btn-delete" onClick={() => onDelete(product.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

interface AddProductFormProps {
    newProduct: NewProduct;
    setNewProduct: React.Dispatch<React.SetStateAction<NewProduct>>;
    newProductImage: File | null;
    setNewProductImage: React.Dispatch<React.SetStateAction<File | null>>;
    onAdd: () => void;
    onCancel: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ 
    newProduct, 
    setNewProduct, 
    newProductImage, 
    setNewProductImage, 
    onAdd, 
    onCancel 
}) => {
    return (
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
                                // Show preview
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setNewProduct({ ...newProduct, imagePreview: reader.result as string });
                                };
                                reader.readAsDataURL(file);

                                // Save file to state for later upload
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
                <button className="btn-add" onClick={onAdd}>Thêm sản phẩm</button>
                <button className="btn-cancel" onClick={onCancel}>Hủy</button>
            </div>
        </div>
    );
};

interface EditProductFormProps {
    editingProduct: EditingProduct | null;
    setEditingProduct: React.Dispatch<React.SetStateAction<EditingProduct | null>>;
    editProductImage: File | null;
    setEditProductImage: React.Dispatch<React.SetStateAction<File | null>>;
    onUpdate: () => void;
    onCancel: () => void;
    formRef: React.RefObject<HTMLDivElement | null>;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({ 
    editingProduct, 
    setEditingProduct, 
    editProductImage, 
    setEditProductImage, 
    onUpdate, 
    onCancel, 
    formRef 
}) => {
    if (!editingProduct) return null;

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && editingProduct) {
            const imageUrl = URL.createObjectURL(file);
            setEditingProduct({ ...editingProduct, imagePreview: imageUrl });
            setEditProductImage(file);
        }
    };

    return (
        <div className="edit-product-form" ref={formRef}>
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
                <button className="btn-update" onClick={onUpdate}>Cập nhật</button>
                <button className="btn-cancel" onClick={onCancel}>Hủy</button>
            </div>
        </div>
    );
};