import Sidebar from "./Sidebar";
import Chats from "./Chats";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import AboutGroup from "./AboutGroup";
import { useEffect } from "react";
import { socket } from "../socket";
import { messageActions } from "../store";
export default function ChatPage() {
  const isMore = useSelector((state) => state.ui.isMore);
  const isAuth = useSelector((state) => state.auth.isConnected);
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
    <div className="App">
      <Sidebar />
      <Chats />
      <Chat />
      {isMore && <AboutGroup />}
    </div>
  );
}
