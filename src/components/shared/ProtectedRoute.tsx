import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks';

interface ProtectedRouteProps {
  component: React.FC;
  layout?: React.FC<{ children: React.ReactNode; }>;
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
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!isPublic && allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" />;
  }

  const Content = Layout ? (
    <Layout>
      <Component />
      <Outlet /> {/* This will render any child routes */}
    </Layout>
  ) : (
    <>
      <Component />
      <Outlet />
    </>
  );

  return Content;
};

export { ProtectedRoute };
