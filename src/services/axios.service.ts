import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const http = {
    GET: 'GET' as const,
    POST: 'POST' as const,
    PUT: 'PUT' as const,
    PATCH: 'PATCH' as const,
    DELETE: 'DELETE' as const,
};

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, timeout: number = 10000) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    // Method to update headers
    public setHeaders(headers: Record<string, string>): void {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers,
        };
    }

    public async request<T>({ url, method, data }: { url: string; method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; data?: unknown; }): Promise<T> {
        const config: AxiosRequestConfig = { method, url, data };
        const response = await this.axiosInstance.request<T>(config);
        return response.data;
    }

    public async get<T>(url: string): Promise<T> {
        return this.request<T>({ url, method: http.GET });
    }

    public async post<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>({ url, method: http.POST, data });
    }

    public async put<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>({ url, method: http.PUT, data });
    }

    public async patch<T>(url: string, data: unknown): Promise<T> {
        return this.request<T>({ url, method: http.PATCH, data });
    }

    public async delete<T>(url: string): Promise<T> {
        return this.request<T>({ url, method: http.DELETE });
    }
}

export { ApiService };
