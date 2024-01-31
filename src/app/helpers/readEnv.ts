import { Environment } from '~/config';

const env: Environment = { ...process.env };

const readEnv = (name: string, fallback: string | number | boolean): any => {
    const value = env[name];

    if (typeof value === 'undefined') return fallback;
    if (typeof fallback === 'number') return parseInt(value) ? parseInt(value) : fallback;
    if (typeof fallback === 'boolean') return Boolean(value);

    return value;
};

export { readEnv };