import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { routes } from '~/constants';

const Navbar: React.FC = () => {
    const { clearUser } = useAuth();

    return (
        <nav>
            <ul>
                <li><Link to={routes.home}>Home</Link></li>
                <li><Link to={routes.dashboard}>User Dashboard</Link></li>
                <li><Link to={routes.admin}>Admin Dashboard</Link></li>
                <li><Link to={routes.login} onClick={clearUser}>Logout</Link></li>
            </ul>
        </nav>
    );
};

export { Navbar };
