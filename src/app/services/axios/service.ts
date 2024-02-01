import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { AxiosConfig } from './types';

class AxiosService {
    private instance: AxiosInstance;
    private cancelTokens: Map<string, CancelTokenSource>;

    constructor({ baseURL, timeOut }: AxiosConfig) {
        this.instance = axios.create({
            baseURL,
            timeout: timeOut || 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.cancelTokens = new Map();
        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.instance.interceptors.request.use(
            (config) => {
                // Create a cancel token source for this request
                const source = axios.CancelToken.source();
                config.cancelToken = source.token;

                // If there's already a request with the same method and payload,
                // cancel the previous request
                const key = this.getRequestKey(config);
                if (this.cancelTokens.has(key)) {
                    this.cancelTokens.get(key)?.cancel('Duplicate request canceled');
                }

                // Save the cancel token source for this request
                this.cancelTokens.set(key, source);

                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.instance.interceptors.response.use(
            (response) => {
                // Remove the cancel token source after the request completes
                const key = this.getRequestKey(response.config);
                this.cancelTokens.delete(key);
                return response;
            },
            (error) => {
                // Remove the cancel token source on error
                const key = this.getRequestKey(error.config);
                this.cancelTokens.delete(key);
                return Promise.reject(error);
            }
        );
    }

    private getRequestKey(config: AxiosRequestConfig): string {
        // Generate a unique key based on the method and payload
        return `${config.method}-${JSON.stringify(config.data)}`;
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

    async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.instance.get(url, config);
    }

    async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.instance.post<T>(url, data, config);
    }

    async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.instance.put<T>(url, data, config);
    }

    async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.instance.delete<T>(url, config);
    }

    async patch<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await this.instance.delete<T>(url, config);
    }
}

export default AxiosService;
