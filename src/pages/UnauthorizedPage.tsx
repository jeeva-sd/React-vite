import React from 'react';

const UnauthorizedPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1>403 - Unauthorized</h1>
            <p>You don't have permission to access this page.</p>
        </div>
    );
};

export { UnauthorizedPage };
