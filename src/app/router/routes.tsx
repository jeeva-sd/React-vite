import { createBrowserRouter } from 'react-router-dom';
import { appRoutes } from '~/views/pages';
import LayoutOne from '~/views/layouts/LayoutOne';
import { wrapRoutes } from './wrapper';
import { Route } from './types';

const routes: Route = wrapRoutes({
    path: '/app',
    private: true,
    element: <LayoutOne />,
    children: appRoutes
});

export const router = createBrowserRouter([
    { path: '/', element: <>Hello</>, index: true },
    routes,
    { path: '*', element: <>Not found</> }
]);