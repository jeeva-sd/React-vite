import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '~/components';

const MainLayout: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h1>Main Layout</h1>
            <Outlet />
        </div>
    );
};

export { MainLayout };
