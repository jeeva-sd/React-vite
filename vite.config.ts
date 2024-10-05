import { envSchema } from './src/configs/envSchema';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const sanitizedENV = envSchema.validateSync(process.env, { abortEarly: false, stripUnknown: true });

    return ({
        define: {
            appConfig: sanitizedENV
        },
        plugins: [react()],
    });
});
