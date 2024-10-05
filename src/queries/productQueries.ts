import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, fetchProductById, fetchProducts, Product } from '../services';
import { QueryKeys } from './keys';

const productKeys = QueryKeys.products;

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: [productKeys.list],
        queryFn: fetchProducts,
    });
};

export const useProduct = (id: number) => {
    return useQuery<Product>({
        queryKey: [productKeys.listById(id)],
        queryFn: () => fetchProductById(id),
    });
};

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [productKeys.list] });
        },
    });
};
