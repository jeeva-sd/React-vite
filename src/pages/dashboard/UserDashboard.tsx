import React from 'react';
import { Outlet } from 'react-router-dom';

const UserDashboard: React.FC = () => {
    return (
        <div>
            <h1>User Dashboard</h1>
            <Outlet />
        </div>
    );
};

export { UserDashboard };
