import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(location.pathname === "/register");

  useEffect(() => {
    if (location.pathname === "/login") {
      setShow(true);
    } else if (location.pathname === "/register") {
      setShow(false);
    }
  }, [location]);

  const clickShowPage = () => {
    if (show) {
      navigate("/register");
    } else {
      navigate("/login", { state: "/" });
    }
    setShow(!show);
  };

  return (
    <>
      {show ? (
        <Login onClick={clickShowPage} />
      ) : (
        <Register onClick={clickShowPage} />
      )}
    </>
  );
}
