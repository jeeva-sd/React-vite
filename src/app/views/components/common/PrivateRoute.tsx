import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
    const isAuthenticated = true;

    return (
        <>{!isAuthenticated ? <Navigate to="/" /> : <>{children}</>}</>
    );
};

export default PrivateRoute;
