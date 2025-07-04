import React from 'react';
import { Route as ReactRouterRoute } from 'react-router-dom';
import { Route } from '../routes';

export const renderRoutes = (routes: Route[]): React.ReactElement[] => {
    return routes.map((route: Route) => {
        const RouteLayout = route.layout || React.Fragment;

        let element: React.ReactElement;

        // Only apply ProtectedRoute if explicitly specified
        if (route.protectedRouteComponent) {
            const ProtectedRouteComponent = route.protectedRouteComponent;
            element = (
                <ProtectedRouteComponent
                    component={route.component}
                    isPublic={route.isPublic || false}
                    allowedRoles={route.roles}
                    requiredPermissions={route.permissions}
                    layout={RouteLayout}
                />
            );
        } else {
            // No protection - render component directly with layout
            const Component = route.component;
            element = (
                <RouteLayout>
                    <Component />
                </RouteLayout>
            );
        }

        // Apply providers if any
        const finalElement = route.providers
            ? route.providers.reduceRight(
                (child, Provider) => <Provider>{child}</Provider>,
                element
            )
            : element;

        return (
            <ReactRouterRoute key={route.path} path={route.path} element={finalElement}>
                {route.children ? renderRoutes(route.children) : null}
            </ReactRouterRoute>
        );
    });
};
