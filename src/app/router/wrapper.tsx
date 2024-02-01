import { Fragment, Suspense } from 'react';
import ErrorBoundary from '../views/components/common/ErrorBoundary';
import PrivateRoute from '../views/components/common/PrivateRoute';
import { Route } from './types';

export const applyRouteConfig = (routeConfig: Route): JSX.Element => {
    const AuthRoute = routeConfig.private ? PrivateRoute : Fragment;

    return (
        <AuthRoute>
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    {routeConfig.element}
                </Suspense>
            </ErrorBoundary>
        </AuthRoute>
    );
};

export const wrapRoutes = (routeConfig: Route): Route => {
    const wrappedRoute = { ...routeConfig };
    wrappedRoute.element = applyRouteConfig(routeConfig);

    if (routeConfig.children) {
        wrappedRoute.children = routeConfig.children.map((child) => wrapRoutes(child));
    }

    return wrappedRoute;
};