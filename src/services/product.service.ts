import { API } from '~/constants';
import { apiService } from '~/configs';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

export const fetchProducts = async ({ page, limit }: { page: number, limit: number; }) => {
    return apiService.request<Product[]>({
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
