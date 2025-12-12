export interface Product {
  product_id: string;
  product_name: string;
  product_title: string;
  product_description: string;
  image_urls: string[];
  subcategory: string;
  category_id: string;
  subcategory_id: string;
  product_price?: number;
  main_category?: string;
  category_name?: string;
  subcategory_name?: string;
}

export interface Subcategory {
  subcategory_id: string;
  subcategory_name: string;
  products: Product[];
}

export interface Category {
  category_id: string;
  category_name: string;
  main_category?: string;
  subcategories: Record<string, Subcategory>;
}

export interface ProductData {
  categories: Record<string, Category>;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
}

