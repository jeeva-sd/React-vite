export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest',
};

export const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'admin123', role: 'user' },
    { id: 3, username: 'guest', password: 'admin123', role: 'guest' },
];

export * from './endpoints';
export * from './queryKeys';
export * from './routes';
