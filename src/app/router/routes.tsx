import { createBrowserRouter } from 'react-router-dom';
import { wrapRoutes } from './wrapper';
import LayoutOne from '@layouts/LayoutOne';
import { Route } from './types';

const appRoutes: Route = wrapRoutes({
    path: '/home',
    element: <LayoutOne />,
    private: false,
    children: [{
        path: '',
        element: <>dashboard</>,
        private: false,
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