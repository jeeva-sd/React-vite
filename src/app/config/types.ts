export interface Environment {
    [key: string]: string | undefined;
}

export interface AppInfo {
    version: string;
    name: string;
    port: number;
    environment: string;
}

export interface ApiConfig {
    baseUrl: string;
    timeOut: number
}

export interface AppConfig {
    app: AppInfo;
    api: ApiConfig;
}