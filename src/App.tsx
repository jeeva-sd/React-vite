import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute, ErrorBoundary } from './components';
import { Route as RouteType, routesConfig } from './configs';
import { UserProvider } from './context';

const renderRoutes = (routes: RouteType[]) =>
    routes.map((route: RouteType, index: number) => {
        const RouteLayout = route.layout || React.Fragment;

        const Component = route.providers
            ? route.providers.reduceRight(
                (child, Provider) => <Provider>{child}</Provider>,
                <ProtectedRoute
                    component={route.component}
                    isPublic={route.isPublic}
                    allowedRoles={route.allowedRoles}
                    layout={RouteLayout}
                />
            )
            : (
                <ProtectedRoute
                    component={route.component}
                    isPublic={route.isPublic}
                    allowedRoles={route.allowedRoles}
                    layout={RouteLayout}
                />
            );

        return (
            <Route
                key={index}
                path={route.path}
                element={Component}
            >
                {route.children ? renderRoutes(route.children) : null}
            </Route>
        );
    });

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <ErrorBoundary> {/* Wrap with Error boundary */}
            <QueryClientProvider client={queryClient}> {/* Wrap with QueryClient provider */}
                <UserProvider>
                    <Router>
                        <Routes>{renderRoutes(routesConfig)}</Routes>
                    </Router>
                </UserProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export { App };
