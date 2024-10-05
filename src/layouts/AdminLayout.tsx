// src/layouts/AdminLayout.tsx
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
