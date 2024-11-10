import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { envSchema } from './src/configs/envSchema';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const sanitizedENV = envSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });

    return {
        define: {
            appConfig: sanitizedENV
        },
        build: {
            sourcemap: false,  // Disable source maps
        },
        plugins: [react()],
        optimizeDeps: {
            exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
        },
        resolve: {
            alias: {
                '~': '/src',  // Set alias for root directory
            },
        },
        server: {
            headers: {
                "Cross-Origin-Opener-Policy": "same-origin",
                "Cross-Origin-Embedder-Policy": "require-corp",
            },
        },
    };
});
