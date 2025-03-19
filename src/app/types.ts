
export interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    image: string | null;
    description?: string;
    specifications?: string;
    stock?: number;
  }
  
  export interface NewProduct {
    name: string;
    price: string;
    category: string;
    imagePreview?: string;
  }
  
  export interface EditingProduct extends Product {
    imagePreview?: string;
  }
