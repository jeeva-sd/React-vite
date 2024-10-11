import React, { ReactNode } from 'react';
import { Navbar } from '~/components';

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div>
            <header>
                <Navbar />
                <h1>Admin Layout</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export { AdminLayout };
