/// <reference types="vite/client" />

import { EnvSchemaType } from "./configs/envSchema";

declare global {
    const appConfig: EnvSchemaType;
}

export {};
