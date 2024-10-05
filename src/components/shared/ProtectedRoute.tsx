import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { routes } from '../../constants';

interface ProtectedRouteProps {
    component: React.FC;
    layout: React.FC<{ children: React.ReactNode; }>;
    isPublic: boolean;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    layout: Layout,
    isPublic,
    allowedRoles = [],
}) => {
    const { user } = useAuth();
    const location = useLocation();
    const isAuthenticated = Boolean(user);

    if (!isPublic && !isAuthenticated) {
        return <Navigate to={routes.login} state={{ from: location }} replace />;
    }

    if (!isPublic && allowedRoles?.length > 0 && !allowedRoles.includes(user?.role || '')) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Layout><Component /></Layout>;
};

export { ProtectedRoute };
