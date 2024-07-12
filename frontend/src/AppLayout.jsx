import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Auth from "./Pages/AuthPage";

function AppLayout() {
  const isAuth = useSelector((state) => state.auth.isConnected);

  return (
    <>
      <Sidebar />
      {isAuth ? <Outlet /> : <Auth />}
    </>
  );
}

export default AppLayout;
