import React, { ReactNode } from 'react';
import { Navbar } from '../components';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Navbar />
            <header>
                <h1>Main Layout</h1>
            </header>
            <main>{children}</main>
        </div>
    );
};

export { MainLayout };
