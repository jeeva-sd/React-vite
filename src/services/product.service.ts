import { apiService } from '.';
import { API } from '../constants';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export const fetchProducts = async () => {
    return await apiService.request<Product[]>({
        url: API.product.list.endpoint,
        method: API.product.list.method
    });
};

export const fetchProductById = async (id: number) => {
    return await apiService.request<Product>({
        url: `${API.product.list.endpoint}/${id}`,
        method: API.product.list.method
    });
};

export const createProduct = async (productData: Omit<Product, 'id'>) => {
    return await apiService.request<Product>({
        url: API.product.create.endpoint,
        method: API.product.create.method,
        data: productData,
    });
};
