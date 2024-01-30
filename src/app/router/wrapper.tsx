import { Fragment, Suspense } from 'react';
import ErrorBoundary from '../views/components/common/ErrorBoundary';
import PrivateRoute from '../views/components/common/PrivateRoute';
import { Route } from './types';

export const wrapRoute = (routeConfig: Route) => {
    const AuthRoute = routeConfig.private ? PrivateRoute : Fragment;
    // const Layout: any = routeConfig?.layout ?? Fragment;
    const Layout: any = Fragment;

    return (
        <AuthRoute>
            <ErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Layout>
                        {routeConfig.element}
                    </Layout>
                </Suspense>
            </ErrorBoundary>
        </AuthRoute>
    );
};

export const wrapRoutes = (routeConfig: Route) => {
    const wrappedRoute = { ...routeConfig };
    wrappedRoute.element = wrapRoute(routeConfig);

    if (routeConfig.children) {
        wrappedRoute.children = routeConfig.children.map((child) => wrapRoutes(child));
    }

    return wrappedRoute;
};