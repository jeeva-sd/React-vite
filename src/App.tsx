import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary, ProtectedRoute } from './components';
import { UserProvider } from './context';
import { AdminPage, Dashboard, HomePage, LoginPage, NotFoundPage, SettingsPage, UnauthorizedPage } from './pages';
import { AdminLayout, MainLayout } from './layouts';
import { queryClient } from './store';

const App: React.FC = () => {
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
