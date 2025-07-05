import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { routes } from '~/constants';

const Navbar: React.FC = () => {
    const { logout } = useAuth();

    return (
        <nav>
            <ul>
                <li><Link to={routes.home}>Home</Link></li>
                <li><Link to={`/app/${routes.dashboard}`}>User Dashboard</Link></li>
                <li><Link to={`/app/${routes.settings}`}>Settings</Link></li>
                <li><Link to={`/app${routes.admin}`}>Admin Dashboard</Link></li>
                <li><Link to={routes.login} onClick={logout}>Logout</Link></li>
            </ul>
        </nav>
    );
};

export { Navbar };
