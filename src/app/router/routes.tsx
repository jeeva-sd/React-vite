import { wrapRoutes } from './wrapper';
import { Outlet, createBrowserRouter } from 'react-router-dom';
import { Route } from './types';

const appRoutes: Route = wrapRoutes({
    path: '/home',
    element: <>home <Outlet /></>,
    private: false,
    layout: <><Outlet /></>,
    children: [{
        path: 'dashboard',
        element: <>dashboard</>,
        private: false,
        layout: <><Outlet /></>
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