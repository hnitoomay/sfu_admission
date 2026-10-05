import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/context/useAuth";
import Navbar from "../../pages/Layout/Navbar";

export function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
