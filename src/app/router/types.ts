import { ReactNode } from 'react';

export interface Route {
    path: string;
    element: ReactNode;
    private: boolean;
    layout?: ReactNode;
    children?: Route[];
}