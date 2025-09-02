import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { envSchema } from './src/configs/envSchema';
import tailwindcss from '@tailwindcss/vite';

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
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '~': '/src',  // Set alias for root directory
            },
        },
    };
});
