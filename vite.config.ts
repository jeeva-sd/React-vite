import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { envSchema } from './src/configs/env.config';

export default defineConfig(({ mode }) => {
    process.env = { ...loadEnv(mode, process.cwd()) };
    const sanitizedENV = envSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });

    return {
        define: {
            appConfig: sanitizedENV,
        },
        build: {
            sourcemap: sanitizedENV.VITE_MODE === 'development',  // Disable source maps in production
        },
        plugins: [react()],
        resolve: {
            alias: {
                '~': '/src',  // Set alias for root directory
            },
        },
    };
});
