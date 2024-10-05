import { ApiService } from './axios.service';

export const apiService = new ApiService('https://fakestoreapi.com');
export * from './product.service';
export * from '../constants/endpoints';
