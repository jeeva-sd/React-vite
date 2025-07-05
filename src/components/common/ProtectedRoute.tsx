import React, { memo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/hooks';

interface ProtectedRouteProps {
    roles?: string[];
    permissions?: string[];
    matchAllRoles?: boolean;
    matchAllPermissions?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = memo(({
    roles,
    permissions,
    matchAllRoles = false,
    matchAllPermissions = false
}) => {
    const { user, hasRole, hasPermission, isLoading } = useAuth();
    const location = useLocation();

    // Show loading while checking authentication
    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check role-based access
    if (roles && roles.length > 0) {
        const hasRequiredRole = matchAllRoles
            ? roles.every(role => hasRole(role))
            : roles.some(role => hasRole(role));

        if (!hasRequiredRole) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // Check permission-based access
    if (permissions && permissions.length > 0) {
        const hasRequiredPermission = matchAllPermissions
            ? permissions.every(permission => hasPermission(permission))
            : permissions.some(permission => hasPermission(permission));

        if (!hasRequiredPermission) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    // For layout routes (Layout = React.Fragment), don't wrap
    // For child routes, Layout will be React.Fragment so just render component
    return <Outlet />;
});

ProtectedRoute.displayName = 'ProtectedRoute';

export { ProtectedRoute };
