import "@fontsource/inter/latin-100.css";
import "@fontsource/inter/latin-200.css";
import "@fontsource/inter/latin-300.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-800.css";
import "@fontsource/inter/latin-900.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Otp from "./pages/auth/Otp";
import ApplicationForm from "./pages/form";
import Home from "./pages/home";
import MyProgram from "./pages/myProgram";
import Profile from "./pages/profile";
import { AuthLayout } from "./components/route/AuthLayout";
import { AppLayout } from "./components/route/AppLayout";
import { HomeLayout } from "./components/route/HomeLayout";
import NotFoundPage from "./components/NotFoundPage";
import ReactGA from "react-ga";
import { useEffect } from "react";
import history from "./history";
import TagManager from "react-gtm-module";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangePassword from "./pages/auth/ChangePassword";
import RootHomePage from "./pages/RootHomePage";

function App() {
  ReactGA.initialize("G-B5PJS6VB5S");

  // This function will log the page view with the given pathname
  const logPageView = (pathname: string) => {
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  };

  // Log the initial page load
  logPageView(window.location.pathname);

  useEffect(() => {
    // Log page view on route change
    TagManager.initialize({ gtmId: "GTM-5K3ZSPGN" });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unlisten = history.listen((location: any) => {
      logPageView(location);
    });

    return () => {
      unlisten();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/personal" element={<ApplicationForm />} />
          <Route path="/my-program" element={<MyProgram />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<RootHomePage />} />
          {/* <Route path="/mba-sfu-wolverhampton" element={<Home />} />
          <Route path="/msc-sfu-wolverhampton" element={<Home />} /> */}
          <Route path="/:slug" element={<Home />} />
          <Route path="/sfu-mba-blended" element={<Home />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
