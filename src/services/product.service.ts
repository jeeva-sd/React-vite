import { API } from '~/constants';
import { apiService } from '~/configs';

export interface Product {
    id: number;
    title: string;
    image: string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount?: number;
    popular?: boolean;
    onSale?: boolean;
  }

  export interface ProductsResponse {
    status: "SUCCESS" | "FAILURE"; // Add other status if needed
    message: string;
    products: Product[];
  }


export const fetchProducts = async ({ page, limit }: { page: number, limit: number; }) => {
    return apiService.request<ProductsResponse>({
        url: `${API.product.list.endpoint}?page=${page}&limit=${limit}`,
        method: API.product.list.method
    });
};

export const fetchProductById = async (id: number) => {
    return apiService.request<Product>({
        url: `${API.product.list.endpoint}/${id}`,
        method: API.product.list.method
    });
};

export const createProduct = async (productData: Omit<Product, 'id'>) => {
    return apiService.request<Product>({
        url: API.product.create.endpoint,
        method: API.product.create.method,
        data: productData,
    });
};
