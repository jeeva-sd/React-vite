import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';

const Navbar: React.FC = () => {
    const { clearUser } = useAuth();

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">User Dashboard</Link></li>
                <li><Link to="/admin">Admin Dashboard</Link></li>
                <li><Link to="/login" onClick={clearUser}>Logout</Link></li>
            </ul>
        </nav>
    );
};

export { Navbar };
