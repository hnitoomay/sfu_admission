import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
