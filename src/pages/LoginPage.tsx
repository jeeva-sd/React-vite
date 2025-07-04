import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/hooks';
import { users } from '~/constants';

const LoginPage: React.FC = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
            // Assign permissions based on role
            let permissions: string[] = [];
            switch (user.role) {
                case 'admin':
                    permissions = ['dashboard', 'admin', 'settings'];
                    break;
                case 'user':
                    permissions = ['dashboard', 'settings'];
                    break;
                case 'guest':
                    permissions = ['dashboard'];
                    break;
                default:
                    permissions = [];
            }

            setUser({
                id: user.id,
                role: user.role,
                permissions,
                username: user.username
            });
            navigate('/app/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p className="error">{error}</p>}
            <div style={{ marginTop: '20px', fontSize: '12px' }}>
                <p>Test accounts:</p>
                <p>admin/admin123 (full access)</p>
                <p>user/user123 (dashboard + settings)</p>
                <p>guest/guest123 (dashboard only)</p>
            </div>
        </div>
    );
};

export { LoginPage };
