import * as yup from 'yup';

const envSchema = yup.object().shape({
    VITE_SOME_KEY: yup.number(),
    VITE_DB_PASSWORD: yup.string(),
});

export const env = envSchema.validateSync(import.meta.env, { abortEarly: false, stripUnknown: true });
