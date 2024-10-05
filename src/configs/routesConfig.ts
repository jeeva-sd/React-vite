// src/config/routesConfig.ts
import HomePage from '../pages/HomePage';
import AdminDashboard from '../pages/AdminDashboard';
import NotFound from '../pages/NotFound';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import UserDashboard from '../pages/dashboard';
import UserHome from '../pages/dashboard/UserHome';
import UserSettings from '../pages/dashboard/UserSettings';

export interface Route {
  path: string;
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode }>;  // Ensure layout expects children
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
    path: '/user-dashboard',
    component: UserDashboard,
    layout: MainLayout,
    isPublic: false,
    allowedRoles: ['user', 'admin'],
    children: [
      {
        path: 'home', // Maps to /user-dashboard/home
        component: UserHome,
        isPublic: false,
        allowedRoles: ['user', 'admin'],
      },
      {
        path: 'settings', // Maps to /user-dashboard/settings
        component: UserSettings,
        isPublic: false,
        allowedRoles: ['user', 'admin'],
      },
    ],
  },
  {
    path: '/admin-dashboard',
    component: AdminDashboard,
    layout: AdminLayout,
    isPublic: false,
    allowedRoles: ['admin'],
  },
  {
    path: '*',
    component: NotFound,
    layout: MainLayout,
    isPublic: true,
  },
];
