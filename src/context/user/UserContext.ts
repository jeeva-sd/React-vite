import { createContext } from 'react';
import type { UserContextType } from './UserProvider';

export const UserContext = createContext<UserContextType | undefined>(undefined);
