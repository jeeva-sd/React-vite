import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [tsconfigPaths(), react()],
        server: {
            port: 3005
        },
        resolve: {
            alias: {
                '~/*': new URL('./src/app', import.meta.url).pathname,
                '@components/*': new URL('./src/app/views/components/*', import.meta.url).pathname,
                '@layouts/*': new URL('./src/app/views/layouts/*', import.meta.url).pathname,
                '@pages/*': new URL('./src/app/views/pages/*', import.meta.url).pathname,
                '@assets/*': new URL('../src/assets/*', import.meta.url).pathname,
            },
        },
        define: {
            'process.env': { ...env }
        }
    };
});
