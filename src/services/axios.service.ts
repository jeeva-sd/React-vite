import axios, { AxiosBasicCredentials, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios';

export const httpMethods = {
    GET: 'GET' as const,
    POST: 'POST' as const,
    PUT: 'PUT' as const,
    PATCH: 'PATCH' as const,
    DELETE: 'DELETE' as const,
};

// Enhanced error types
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
    details?: unknown;
}

// Type for API error response
interface ApiErrorResponse {
    message?: string;
    error?: string;
    details?: unknown;
}

class ApiService {
    private axiosInstance: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: Array<{ resolve: (token: string) => void; reject: (error: unknown) => void }> = [];

    constructor(
        baseURL: string,
        timeout: number = 20000,
        headers?: Record<string, string>,
        private enableLogging: boolean = process.env.NODE_ENV === 'development',
        private enableTokenRefresh: boolean = true
    ) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor with token injection
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                // Auto-inject auth token if available
                const token = this.getStoredToken();
                if (token && !config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                // Log request in development
                if (this.enableLogging) {
                    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
                        headers: config.headers,
                        data: config.data
                    });
                }

                return config;
            },
            (error) => {
                if (this.enableLogging) {
                    console.error('❌ Request Error:', error);
                }
                return Promise.reject(this.handleError(error));
            }
        );

        // Response interceptor with conditional token refresh logic
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                if (this.enableLogging) {
                    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
                        status: response.status,
                        data: response.data
                    });
                }
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

                // Handle 401 errors with token refresh (only if enabled)
                if (this.enableTokenRefresh && error.response?.status === 401 && !originalRequest._retry) {
                    if (this.isRefreshing) {
                        // Queue the request while token is being refreshed
                        return new Promise((resolve, reject) => {
                            this.failedQueue.push({ resolve, reject });
                        }).then(token => {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return this.axiosInstance(originalRequest);
                        }).catch(err => Promise.reject(err));
                    }

                    originalRequest._retry = true;
                    this.isRefreshing = true;

                    try {
                        const newToken = await this.refreshToken();
                        this.processQueue(null, newToken);
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return this.axiosInstance(originalRequest);
                    } catch (refreshError) {
                        this.processQueue(refreshError, null);
                        this.handleTokenExpiry();
                        return Promise.reject(this.handleError(refreshError));
                    } finally {
                        this.isRefreshing = false;
                    }
                }

                // If token refresh is disabled or it's not a 401, just handle the error normally
                if (this.enableLogging) {
                    console.error('❌ API Error:', error.response?.status, error.message);
                    if (!this.enableTokenRefresh && error.response?.status === 401) {
                        console.log('💡 Token refresh is disabled. Consider enabling VITE_ENABLE_TOKEN_REFRESH=true');
                    }
                }

                return Promise.reject(this.handleError(error));
            }
        );
    }

    private processQueue(error: unknown, token: string | null) {
        this.failedQueue.forEach(({ resolve, reject }) => {
            if (error) {
                reject(error);
            } else if (token) {
                resolve(token);
            }
        });

        this.failedQueue = [];
    }

    private async refreshToken(): Promise<string> {
        // Implement your token refresh logic here
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await axios.post('/auth/refresh', {
                refreshToken
            });

            const { accessToken } = response.data;
            localStorage.setItem('authToken', accessToken);
            return accessToken;
        } catch (error) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            throw error;
        }
    }

    private handleTokenExpiry() {
        // Clear tokens and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');

        // Dispatch custom event for logout
        window.dispatchEvent(new CustomEvent('tokenExpired'));
    }

    private getStoredToken(): string | null {
        return localStorage.getItem('authToken');
    }

    private handleError(error: unknown): ApiError {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ApiErrorResponse>;

            return {
                message: axiosError.response?.data?.message ||
                        axiosError.response?.data?.error ||
                        axiosError.message ||
                        'An error occurred',
                status: axiosError.response?.status,
                code: axiosError.code,
                details: axiosError.response?.data
            };
        }

        return {
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            details: error
        };
    }

    // Method to update headers
    public setHeaders(headers: Record<string, string>): void {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers,
        };
    }

    public setAuthToken(token: string): void {
        localStorage.setItem('authToken', token);
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    public clearAuthToken(): void {
        localStorage.removeItem('authToken');
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }

    public updateConfig({ headers, withCredentials = false, auth, }: {
        headers?: AxiosRequestHeaders;
        withCredentials?: boolean;
        auth?: AxiosBasicCredentials;
    }) {
        if (headers) {
            this.axiosInstance.defaults.headers.common = {
                ...this.axiosInstance.defaults.headers.common,
                ...headers,
            };
        }

        this.axiosInstance.defaults.withCredentials = withCredentials;

        if (auth) {
            this.axiosInstance.defaults.auth = auth;
        }
    }

    public async request<T>({ url, method, data, headers, withCredentials, auth }: {
        url: string;
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
        data?: unknown;
        headers?: AxiosRequestHeaders;
        withCredentials?: boolean;
        auth?: AxiosBasicCredentials;
    }): Promise<T> {
        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: {
                ...this.axiosInstance.defaults.headers.common,
                ...headers,
            },
            withCredentials,
            auth
        };

        const response = await this.axiosInstance.request<T>(config);
        return response.data;
    }

    // Enhanced convenience methods
    public async get<T>(url: string, options?: { headers?: AxiosRequestHeaders }): Promise<T> {
        return this.request<T>({
            url,
            method: httpMethods.GET,
            headers: options?.headers
        });
    }

    public async post<T>(url: string, data: unknown, options?: { headers?: AxiosRequestHeaders }): Promise<T> {
        return this.request<T>({
            url,
            method: httpMethods.POST,
            data,
            headers: options?.headers
        });
    }

    public async put<T>(url: string, data: unknown, options?: { headers?: AxiosRequestHeaders }): Promise<T> {
        return this.request<T>({
            url,
            method: httpMethods.PUT,
            data,
            headers: options?.headers
        });
    }

    public async patch<T>(url: string, data: unknown, options?: { headers?: AxiosRequestHeaders }): Promise<T> {
        return this.request<T>({
            url,
            method: httpMethods.PATCH,
            data,
            headers: options?.headers
        });
    }

    public async delete<T>(url: string, options?: { headers?: AxiosRequestHeaders }): Promise<T> {
        return this.request<T>({
            url,
            method: httpMethods.DELETE,
            headers: options?.headers
        });
    }
}

export { ApiService };
