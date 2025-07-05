import { ApiService } from "~/services";

const apiBaseUrl = appConfig.VITE_API_BASE_URL;
const apiTimeout = appConfig.VITE_API_TIMEOUT;
const enableTokenRefresh = appConfig.VITE_ENABLE_TOKEN_REFRESH;
const mode = appConfig.VITE_MODE;

export const apiService = new ApiService(
    apiBaseUrl,
    apiTimeout,
    {},
    // Enable logging only in development
    mode === 'development',
    // Enable token refresh based on config
    enableTokenRefresh
);
