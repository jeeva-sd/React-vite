import { ReactNode } from 'react';
import { MainLayout, AdminLayout } from '../layouts';
import { HomePage, NotFoundPage, LoginPage, AdminDashboardPage, UserDashboard, UserHome, UserSettings } from '../pages';

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
        path: '/user-dashboard',
        layout: MainLayout,
        component: UserDashboard,
        isPublic: false,
        allowedRoles: ['user', 'admin'],
        children: [
            {
                path: 'home',
                component: UserHome,
                isPublic: false,
                allowedRoles: ['user', 'admin'],
            },
            {
                path: 'settings',
                component: UserSettings,
                isPublic: false,
                allowedRoles: ['user', 'admin'],
            },
        ],
    },
    {
        path: '/admin-dashboard',
        layout: AdminLayout,
        component: AdminDashboardPage,
        isPublic: false,
        allowedRoles: ['admin'],
    },
    {
        path: '*',
        layout: MainLayout,
        component: NotFoundPage,
        isPublic: true,
    },
];
