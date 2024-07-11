import Sidebar from "./Sidebar";
import Chats from "./Chats";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import AboutGroup from "./AboutGroup";
import { useEffect, useRef } from "react";
import { socket } from "../socket";
import { messageActions } from "../store";
import { uiActions, userActions } from "../store";
export default function ChatPage() {
  const inputRef = useRef();
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
      if (!isAuth) {
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

  async function handleOpenChat(user) {
    dispatch(userActions.getAnotherUser(user));
    dispatch(uiActions.changeIsPressed(true));
    inputRef.current.value = "";
  }

  return (
    <div className="App">
      <Sidebar me={username} />
      <Chats
        me={username}
        handleOpenChat={(user) => handleOpenChat(user)}
        inputRef={inputRef}
      />
      <Chat me={username} />
      {isMore && <AboutGroup />}
    </div>
  );
}
