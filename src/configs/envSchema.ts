import * as yup from 'yup';

export const envSchema = yup.object().shape({
    VITE_APP_NAME: yup.string().required(),
    VITE_APP_VERSION: yup.string().required(),
    VITE_API_BASE_URL: yup.string().url().required(),
    VITE_ENABLE_TOKEN_REFRESH: yup.boolean(),
    VITE_MODE: yup.string().oneOf(['development', 'production']),
    VITE_API_TIMEOUT: yup.number().positive().integer().required(),
});

export type EnvSchemaType = yup.InferType<typeof envSchema>;
