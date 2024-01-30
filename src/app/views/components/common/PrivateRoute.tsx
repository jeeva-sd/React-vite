import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
    const isAuthenticated = true; // Replace with your authentication logic
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <>{children}</> : <></>;
};

export default PrivateRoute;
