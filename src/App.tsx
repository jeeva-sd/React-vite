import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './components';
import { Dashboard, HomePage, NotFoundPage, SettingsPage, UnauthorizedPage } from './pages';
import { MainLayout } from './layouts';
import { queryClient } from './configs';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        {/* Default route - redirect to home */}
                        <Route path="/" element={<Navigate to="/app/home" replace />} />

                        {/* Public routes */}
                        <Route path="/unauthorized" element={<UnauthorizedPage />} />

                        {/* Protected app routes */}
                        <Route path="/app">
                            <Route element={<MainLayout />}>
                                <Route path="home" element={<HomePage />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="settings" element={<SettingsPage />} />
                            </Route>
                        </Route>

                        {/* Catch all route */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </ErrorBoundary >
    );
};

export default App;
