import * as yup from 'yup';

export const envSchema = yup.object().shape({
    VITE_SOME_KEY: yup.number(),
    VITE_DB_PASSWORD: yup.string(),
    VITE_DB: yup.string(),
});

export type EnvSchemaType = yup.InferType<typeof envSchema>;
