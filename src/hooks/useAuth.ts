// src/hooks/useAuth.ts
import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const { isAuthenticated, userRole } = useUser();
  return { isAuthenticated, userRole };
};
