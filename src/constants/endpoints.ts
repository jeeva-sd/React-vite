import { httpMethods } from '~/services/axios.service';

const { GET, POST } = httpMethods;

export const API = {
    product: {
        list: { method: GET, endpoint: '/api/products' },
        create: { method: POST, endpoint: '/products' },
    }
} as const;
