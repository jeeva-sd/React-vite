import { MainLayout, AdminLayout } from '../layouts';
import { HomePage, NotFoundPage, LoginPage, AdminDashboardPage, UserDashboard, UserHome, UserSettings } from '../pages';

export interface Route {
    path: string;
    component: React.FC;
    layout?: React.FC<{ children: React.ReactNode; }>;
    isPublic: boolean;
    allowedRoles?: string[];
    children?: Route[];
}

export const routesConfig: Route[] = [
    {
        path: '/',
        component: HomePage,
        layout: MainLayout,
        isPublic: true,
    },
    {
        path: '/login',
        component: LoginPage,
        isPublic: true,
    },
    {
        path: '/user-dashboard',
        component: UserDashboard,
        layout: MainLayout,
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
        component: AdminDashboardPage,
        layout: AdminLayout,
        isPublic: false,
        allowedRoles: ['admin'],
    },
    {
        path: '*',
        component: NotFoundPage,
        layout: MainLayout,
        isPublic: true,
    },
];
