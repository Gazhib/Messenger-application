import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "./socket";
import { messageActions } from "./store";
import RegistrationPage from "./Components/RegistrationPage";
import SignInPage from "./Components/SignInPage";
import Sidebar from "./Components/Sidebar";

function AppLayout() {
  const isAuth = useSelector((state) => state.auth.isConnected);
  const regLog = useSelector((state) => state.ui.regLog);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleConnect = () => {
      socket.emit("register-id", username);
    };

    if (isAuth) {
      socket.on("connect", handleConnect);
    }

    return () => {
      if (isAuth) {
        socket.off("connect", handleConnect);
      }
    };
  }, [username, isAuth]);

  useEffect(() => {
    const receiveMessage = (message) => {
      console.log(message);
      dispatch(messageActions.addMessage(message));
    };

    socket.on("receive-message", receiveMessage);

    return () => {
      socket.off("receive-message", receiveMessage);
    };
  }, [dispatch]);

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
