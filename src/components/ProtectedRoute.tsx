// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  component: React.FC;  // The component to render
  layout?: React.FC<{ children: React.ReactNode }>; // Optional layout that accepts children
  isPublic: boolean;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  layout: Layout,
  isPublic,
  allowedRoles = [],
}) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  if (!isPublic && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!isPublic && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  // Use a Fragment if no layout is provided
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

export default ProtectedRoute;
