import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute, ErrorBoundary } from './components';
import { UserProvider } from './context';
import { Route as RouteType, routesConfig } from './configs';

const renderRoutes = (routes: RouteType[]) =>
    routes.map((route: RouteType, index: number) => (
        <Route
            key={index}
            path={route.path}
            element={
                <ProtectedRoute
                    component={route.component}
                    layout={route.layout}
                    isPublic={route.isPublic}
                    allowedRoles={route.allowedRoles}
                />
            }
        >
            {route.children ? renderRoutes(route.children) : null}
        </Route>
    ));

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <ErrorBoundary> {/* Wrap with Error boundary */}
            <UserProvider>
                <QueryClientProvider client={queryClient}> {/* Wrap with QueryClient provider */}
                    <Router>
                        <Routes>{renderRoutes(routesConfig)}</Routes>
                    </Router>
                </QueryClientProvider>
            </UserProvider>
        </ErrorBoundary>
    );
};

export default App;
