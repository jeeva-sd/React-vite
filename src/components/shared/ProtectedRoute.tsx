import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks';

interface ProtectedRouteProps {
    component: React.FC;
    isPublic: boolean;
    allowedRoles?: string[];
    requiredPermissions?: string[];
    layout: React.FC<{ children: React.ReactNode }>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    isPublic,
    allowedRoles,
    requiredPermissions,
    layout: Layout,
}) => {
    const { user, hasRole, hasPermission, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <Layout>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Loading...</p>
                </div>
            </Layout>
        );
    }

    // Public routes - always accessible
    if (isPublic) {
        return (
            <Layout>
                <Component />
            </Layout>
        );
    }

    // Not authenticated - redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access
    if (allowedRoles && !allowedRoles.some(role => hasRole(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Check permission-based access
    if (requiredPermissions && !requiredPermissions.every(permission => hasPermission(permission))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return (
        <Layout>
            <Component />
        </Layout>
    );
};

export { ProtectedRoute };
