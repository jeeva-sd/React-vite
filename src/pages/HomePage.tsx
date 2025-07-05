import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { routes } from '../constants/routes';

const HomePage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Only redirect to dashboard if user is on the exact /app path
            // Don't redirect if they're already on a specific child route
            if (location.pathname === routes.home || location.pathname === routes.home + '/') {
                navigate(`/app/${routes.dashboard}`);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate, location.pathname]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Render Outlet for child routes (dashboard, settings)
    return <Outlet />;
};

export { HomePage };
