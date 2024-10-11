import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, fetchProductById, fetchProducts, Product } from '~/services';
import { queryKeys } from '~/constants';

const productKeys = queryKeys.product;

export const useProducts = () => {
    return useQuery<Product[]>({
        queryKey: [productKeys.list],
        queryFn: fetchProducts,
        staleTime: Infinity
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
