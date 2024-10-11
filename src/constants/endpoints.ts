import { httpMethods } from '~/services/axios.service';

const { GET, POST } = httpMethods;

export const API = {
    product: {
        list: { method: GET, endpoint: '/products' },
        create: { method: POST, endpoint: '/products' },
    }
} as const;
