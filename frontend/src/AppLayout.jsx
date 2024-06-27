import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import RegistrationPage from "./Components/RegistrationPage";
import SignInPage from "./Components/SignInPage";
import Sidebar from "./Components/Sidebar";

function AppLayout() {
  const isAuth = useSelector((state) => state.auth.isConnected);
  const regLog = useSelector((state) => state.ui.regLog);

  return (
    <>
      <Sidebar />
      {isAuth ? (
        <Outlet />
      ) : regLog === "registration" ? (
        <RegistrationPage />
      ) : (
        <SignInPage />
      )}
    </>
  );
}

export default AppLayout;
