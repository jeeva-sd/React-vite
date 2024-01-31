import { createBrowserRouter } from 'react-router-dom';
import { wrapRoutes } from './wrapper';
import LayoutOne from '@layouts/LayoutOne';
import { Route } from './types';
import Dashboard from '@pages/dashboard';

const appRoutes: Route = wrapRoutes({
    path: '/home',
    element: <LayoutOne />,
    private: true,
    children: [{
        path: 'dashboard',
        element: <Dashboard />,
        private: true,
    }]
});

export const router = createBrowserRouter([
    {
        path: '/',
        element: <>Hello</>,
        index: true
    },
    {
        path: '*',
        element: <>Not found</>,
    },
    appRoutes
]);