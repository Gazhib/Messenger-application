import Chats from "../Components/Chats";
import { useSelector, useDispatch } from "react-redux";
import AboutGroup from "../Components/AboutGroup";
import { useRef, useEffect, useState } from "react";
import { messageActions, uiActions, userActions } from "../store";
import { Outlet, useParams } from "react-router-dom";
import { socket } from "../socket";
import { Fetching } from "../fetching";
export default function ChatPage() {
  const inputRef = useRef();

  const isMore = useSelector((state) => state.ui.isMore);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const { partner } = useParams();
  const [chats, setChats] = useState([]);
  async function handleOpenChat(user) {
    dispatch(userActions.getAnotherUser(user));
    dispatch(uiActions.changeIsPressed(true));
    inputRef.current.value = "";
  }

  useEffect(() => {
    async function getFriendsAndChats() {
      const chatResponse = await Fetching("get-chats", { sender: username });
      const chats = chatResponse.info.chats;
      if (chats) {
        dispatch(userActions.getChats(chats));
        setChats(chats);
      }
    }

    getFriendsAndChats();
  }, [username]);

  async function handleSearch(event) {
    event.preventDefault();
    const typed = event.target.value;
    const users = await Fetching("search-users", { typed });
    dispatch(userActions.getChats(users.info.users));
    if (event.target.value === "") {
      dispatch(userActions.getChats(chats));
    }
  }

  useEffect(() => {
    const handleMessageReceive = (data) => {
      const message = {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
        timestamp: data.timestamp,
      };
      console.log(data.sender, partner);
      if (partner === data.sender) {
        dispatch(messageActions.addMessage(message));
      }
      async function getFriendsAndChats() {
        const chatResponse = await Fetching("get-chats", { sender: username });
        const chats = chatResponse.info.chats;
        if (chats) {
          dispatch(userActions.getChats(chats));
        }
      }

      getFriendsAndChats();
    };
    socket.on("receiveMessage", handleMessageReceive);

    return () => {
      socket.off("receiveMessage", handleMessageReceive);
    };
  }, [username]);

  return (
    <div className="App">
      <Chats
        me={username}
        handleOpenChat={(user) => handleOpenChat(user)}
        inputRef={inputRef}
        handleSearch={handleSearch}
      />
      <Outlet key={partner} />
      {isMore && <AboutGroup />}
    </div>
  );
}
