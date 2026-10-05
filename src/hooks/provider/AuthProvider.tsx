import { useCallback } from "react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, IUser } from "../context/AuthContext";
import { useLocalStorage } from "../customHook/useLocalStorage";

type AuthProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useLocalStorage("user", null);

  const navigate = useNavigate();

  const login = useCallback(
    async (data: IUser, previousRoute: string) => {
      setUser(data);
      navigate(`${previousRoute === null ? "/" : previousRoute}`, {
        replace: true,
      });
    },
    [navigate, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    navigate("/", { replace: true });
  }, [navigate, setUser]);

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [login, logout, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
