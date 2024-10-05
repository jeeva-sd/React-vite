export const QueryKeys = {
    products: {
        list: 'products',
        listById: (id: number) => [`product`, id],
    }
} as const;
