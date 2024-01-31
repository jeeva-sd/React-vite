import Dashboard from '@pages/dashboard';
import { Route } from '~/router/types';
import Settings from './Settings';

export const appRoutes: Route[] = [{
    path: '',
    element: <Dashboard />,
    private: true,
}, {
    path: 'settings',
    element: <Settings />,
    private: true,
}];