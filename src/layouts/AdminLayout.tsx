import { Outlet } from 'react-router-dom';
import { Navbar } from '~/components';

const AdminLayout: React.FC = () => {
    return (
        <div>
            <header>
                <Navbar />
                <h1>Admin Layout</h1>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export { AdminLayout };
