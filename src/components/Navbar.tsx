import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '~/constants';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li><Link to={`/app/${routes.dashboard}`}>User Dashboard</Link></li>
                <li><Link to={`/app/${routes.settings}`}>Settings</Link></li>
            </ul>
        </nav>
    );
};

export { Navbar };
