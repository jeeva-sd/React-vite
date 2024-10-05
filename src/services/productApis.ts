import { apiService } from '.';
import { API_ENDPOINTS } from './endpoints';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export const fetchProducts = async () => {
    return await apiService.request<Product[]>({
        url: API_ENDPOINTS.product.list.endpoint,
        method: API_ENDPOINTS.product.list.method,
    });
};

export const fetchProductById = async (id: number) => {
    return await apiService.request<Product>({
        url: `${API_ENDPOINTS.product.list.endpoint}/${id}`,
        method: API_ENDPOINTS.product.list.method,
    });
};

export const createProduct = async (productData: Omit<Product, 'id'>) => {
    return await apiService.request<Product>({
        url: API_ENDPOINTS.product.create.endpoint,
        method: API_ENDPOINTS.product.create.method,
        data: productData,
    });
};
