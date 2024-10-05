import React, { createContext, useState } from 'react';

interface User {
    id: number;
    role: string;
}

export interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const clearUser = () =>  setUser(null);

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

