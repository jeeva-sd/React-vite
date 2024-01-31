import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AxiosConfig } from './types';

class AxiosService {
    private instance: AxiosInstance;

    constructor({ baseURL, timeOut }: AxiosConfig) {
        this.instance = axios.create({
            baseURL,
            timeout: timeOut || 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                // Modify the request config here
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                // Modify the response here
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    public updateBaseUrl(baseURL: string): void {
        this.instance.defaults.baseURL = baseURL;
    }

    public updateHeaders(headers: Record<string, string>): void {
        this.instance.defaults.headers = { ...this.instance.defaults.headers, ...headers };
    }

    public updateTimeout(timeout: number): void {
        this.instance.defaults.timeout = timeout;
    }

    public updateConfig(config: AxiosRequestConfig): void {
        this.instance.defaults = Object.assign({}, this.instance.defaults, config);
    }

    async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<unknown> {
        return this.instance.get<T>(url, config);
    }

    async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<unknown> {
        return this.instance.post<T>(url, data, config);
    }

    async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<unknown> {
        return this.instance.put<T>(url, data, config);
    }

    async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<unknown> {
        return this.instance.delete<T>(url, config);
    }

    async patch<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<unknown> {
        return this.instance.delete<T>(url, config);
    }
}

export default AxiosService;
