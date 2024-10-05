export const queryKeys = {
    product: {
        list: 'products',
        listById: (id: number) => [`product`, id],
    }
} as const;
