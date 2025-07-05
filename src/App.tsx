import React, { useMemo } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, ProtectedRoute } from './components';
import { UserProvider } from './context';
import { AdminPage, Dashboard, HomePage, LoginPage, NotFoundPage, SettingsPage, UnauthorizedPage } from './pages';
import { AdminLayout, MainLayout } from './layouts';

const App: React.FC = () => {
    // Create QueryClient once, not on every render
    const queryClient = useMemo(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
                retry: 2,
                refetchOnWindowFocus: false, // Prevent unnecessary refetches
            },
        },
    }), []);

    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <BrowserRouter>
                        <Routes>
                            {/* Default route - redirect to home */}
                            <Route path="/" element={<Navigate to="/login" replace />} />

                            {/* Public routes */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/unauthorized" element={<UnauthorizedPage />} />

                            {/* Protected app routes */}
                            <Route path="/app">
                                <Route element={<HomePage />}>
                                    <Route element={<ProtectedRoute permissions={['dashboard']} />}>
                                        <Route element={<MainLayout />}>
                                            <Route path="dashboard" element={<Dashboard />} />
                                            <Route path="settings" element={<SettingsPage />} />
                                        </Route>
                                    </Route>
                                </Route>

                                <Route element={<ProtectedRoute permissions={['admin']} />}>
                                    <Route element={<AdminLayout />}>
                                        <Route path="admin" element={<AdminPage />} />
                                    </Route>
                                </Route>
                            </Route>

                            {/* Catch all route */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </QueryClientProvider>
        </ErrorBoundary >
    );
};

export default App;
