/// <reference types="vite/client" />

import { EnvSchemaType } from "./configs/env.config";

declare global {
    const appConfig: EnvSchemaType;
}

export {};
