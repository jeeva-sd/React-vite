import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components';
import { routesConfig } from './configs';
import { UserProvider } from './context';
import { renderRoutes } from './configs/routes';

const App: React.FC = () => {
    // Create QueryClient once, not on every render
    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                retry: 1,
            },
        },
    }), []);

    // Memoize the rendered routes for performance
    const routes = useMemo(() => renderRoutes(routesConfig), []);

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Router>
                        <Routes>{routes}</Routes>
                    </Router>
                </UserProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export { App };
