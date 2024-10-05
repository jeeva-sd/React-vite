import { http } from './axios.service';

export const API_ENDPOINTS = {
    product: {
        list: { method: http.GET, endpoint: '/products' },
        create: { method: http.POST, endpoint: '/products' },
    }
};
