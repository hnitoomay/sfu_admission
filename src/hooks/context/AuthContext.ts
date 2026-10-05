import { createContext } from "react";

export interface IUser {
  id?: number;
  phone: string | number;
  token: string;
}
export type AuthContextType = {
  user: IUser | null;
  login: (data: IUser, previousRoute: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
