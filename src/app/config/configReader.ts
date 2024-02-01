import { readEnv } from '~/helpers';
import { AppConfig } from './types';

export const appConfig: AppConfig = {
    app: {
        version: readEnv('VERSION', 'v1.0'),
        name: readEnv('APP_NAME', 'Node-API'),
        port: readEnv('PORT', 3000),
        environment: readEnv('NODE_ENV', 'local'),
    },
    api: {
        baseUrl: readEnv('API_BASE_URL', 'https://jsonplaceholder.typicode.com'),
        timeOut: readEnv('API_TIME_OUT', 3000),
    }
};