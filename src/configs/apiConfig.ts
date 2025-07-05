import { ApiService } from "~/services";

// Use environment variable for API base URL
const API_BASE_URL = appConfig.VITE_API_BASE_URL || 'https://fakestoreapi.com';
const API_TIMEOUT = appConfig.VITE_API_TIMEOUT || 20000;
const ENABLE_TOKEN_REFRESH = appConfig.VITE_ENABLE_TOKEN_REFRESH ?? true;

export const apiService = new ApiService(
    API_BASE_URL,
    API_TIMEOUT,
    {
        'X-App-Version': '1.0.0',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${appConfig.VITE_API_TOKEN}`,
    },
    // Enable logging only in development
    process.env.NODE_ENV === 'development',
    // Enable token refresh based on config
    ENABLE_TOKEN_REFRESH
);
