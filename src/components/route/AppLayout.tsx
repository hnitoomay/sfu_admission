import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/context/useAuth";
import Navbar from "../../pages/Layout/Navbar";
import Footer from "../../pages/Layout/Footer";

export function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
