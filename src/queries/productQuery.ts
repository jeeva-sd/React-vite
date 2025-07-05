import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { createProduct, fetchProductById, fetchProducts, Product, ProductsResponse } from '~/services';
import { queryKeys } from '~/constants';

const productKeys = queryKeys.product;

export const useProducts = ({ page, limit }: { page: number, limit: number; }) => {
    return useQuery<ProductsResponse>({
        queryKey: [productKeys.list, page, limit],
        queryFn: () => fetchProducts({ page, limit }),
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

export const useInfiniteProducts = ({ limit }: { limit: number }) => {
    return useInfiniteQuery<ProductsResponse>({
        queryKey: [productKeys.list, 'infinite', limit],
        queryFn: ({ pageParam = 1 }) => fetchProducts({ page: pageParam as number, limit }),
        getNextPageParam: (lastPage, allPages) => {
            // If there are products in the last page, get the next page
            if (lastPage.products && lastPage.products.length === limit) {
                return allPages.length + 1;
            }
            // No more pages
            return undefined;
        },
        initialPageParam: 1,
        staleTime: Infinity
    });
};
