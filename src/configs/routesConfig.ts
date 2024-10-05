import { ReactNode } from 'react';
import { MainLayout, AdminLayout } from '../layouts';
import { HomePage, NotFoundPage, LoginPage, AdminPage, Dashboard } from '../pages';

export interface Route {
    path: string;
    component: React.FC;
    layout?: React.FC<{ children: React.ReactNode; }>;
    isPublic: boolean;
    allowedRoles?: string[];
    children?: Route[];
    providers?: Array<React.FC<{ children: ReactNode; }>>;
}

export const routesConfig: Route[] = [
    {
        path: '/',
        layout: MainLayout,
        component: HomePage,
        isPublic: true,
    },
    {
        path: '/login',
        component: LoginPage,
        isPublic: true,
    },
    {
        path: '/dashboard',
        layout: MainLayout,
        component: Dashboard,
        isPublic: false,
    },
    {
        path: '/admin',
        layout: AdminLayout,
        component: AdminPage,
        isPublic: false,
        allowedRoles: ['admin'],
    },
    {
        path: '*',
        component: NotFoundPage,
        isPublic: true,
    },
];
