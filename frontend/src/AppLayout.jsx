import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Auth from "./Pages/AuthPage";
import { useEffect } from "react";
import { socket } from "./socket";
function AppLayout() {
  const isAuth = useSelector((state) => state.auth.isConnected);
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(username);
  }, [navigate, username]);
  useEffect(() => {
    const handleConnect = () => {
      socket.emit("register-id", username);
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [username]);

  return (
    <>
      <Sidebar me={username} />
      {isAuth ? <Outlet /> : <Auth />}
    </>
  );
}

export default AppLayout;
