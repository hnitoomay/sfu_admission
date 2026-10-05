import Navbar from "../../pages/Layout/Navbar";
import Footer from "../../pages/Layout/Footer";
import { Outlet } from "react-router-dom";

export function HomeLayout() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
