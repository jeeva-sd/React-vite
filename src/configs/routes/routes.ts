/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { MainLayout, AdminLayout } from '~/layouts';
import { NotFoundPage, LoginPage, AdminPage, Dashboard, HomePage, SettingsPage, UnauthorizedPage } from '~/pages';
import { ProtectedRoute } from '~/components';
import { routes } from '~/constants';
import { UserProvider } from '~/context';

export interface Route {
    path: string;
    component: React.FC;
    layout?: React.FC<{ children: React.ReactNode; }>;
    isPublic?: boolean;
    roles?: string[];
    permissions?: string[];
    children?: Route[];
    providers?: Array<React.FC<{ children: ReactNode; }>>;
    protectedRouteComponent?: React.ComponentType<any>;
}

export const routesConfig: Route[] = [
    // Public routes
    {
        path: routes.login,
        component: LoginPage,
        isPublic: true,
        providers: [UserProvider],
    },
    {
        path: '/unauthorized',
        component: UnauthorizedPage,
        isPublic: true,
    },

    // Protected app routes with nested children
    {
        path: routes.home,
        component: HomePage,
        layout: MainLayout,
        protectedRouteComponent: ProtectedRoute,
        children: [
            {
                path: routes.dashboard,
                component: Dashboard,
                protectedRouteComponent: ProtectedRoute,
                permissions: ['dashboard'],
            },
            {
                path: routes.settings,
                component: SettingsPage,
                protectedRouteComponent: ProtectedRoute,
                permissions: ['settings'],
            },
        ]
    },

    // Admin routes
    {
        path: routes.admin,
        component: AdminPage,
        layout: AdminLayout,
        protectedRouteComponent: ProtectedRoute,
        providers: [UserProvider],
        permissions: ['admin'],
    },

    // Catch-all route
    {
        path: '*',
        component: NotFoundPage,
        isPublic: true,
    },
];
