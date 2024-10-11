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
            setUser({ id: user.id, role: user.role });
            navigate('/');
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
        </div>
    );
};

export { LoginPage };
