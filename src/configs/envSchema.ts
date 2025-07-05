import * as yup from 'yup';

export const envSchema = yup.object().shape({
    VITE_SOME_KEY: yup.number(),
    VITE_DB_PASSWORD: yup.string(),
    VITE_DB: yup.string(),
    VITE_API_BASE_URL: yup.string().url(),
    VITE_API_TIMEOUT: yup.number().positive(),
    VITE_ENABLE_TOKEN_REFRESH: yup.boolean(),
});

export type EnvSchemaType = yup.InferType<typeof envSchema>;
