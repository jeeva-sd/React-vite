import { Outlet } from 'react-router-dom';

const LayoutOne = () => {
    return (
        <div>LayoutOne
            <Outlet />
        </div>
    );
};

export default LayoutOne;