import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface User {
    id: number;
    role: string;
    permissions: string[];
    username?: string;
}

export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    hasRole: (role: string) => boolean;
    hasPermission: (permission: string) => boolean;
    hasAnyPermission: (permissions: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    logout: () => void;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading user from localStorage:', error);
            localStorage.removeItem('user');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save user to localStorage whenever user changes
    const handleSetUser = (newUser: User | null) => {
        setUser(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };

    const hasRole = (role: string): boolean => {
        return user?.role === role;
    };

    const hasPermission = (permission: string): boolean => {
        return user?.permissions?.includes(permission) || false;
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(permission => hasPermission(permission));
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        return permissions.every(permission => hasPermission(permission));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser: handleSetUser,
            hasRole,
            hasPermission,
            hasAnyPermission,
            hasAllPermissions,
            logout,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    );
};
