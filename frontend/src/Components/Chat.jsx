import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/index.js";
import { socket } from "../socket.js";
import { useEffect, useRef, useState } from "react";
import style from "./Chat.module.css";
import { GetMessages, SendMessage } from "../fetching.js";
import { useNavigate } from "react-router";
export default function Chat() {
  const isPressed = useSelector((state) => state.ui.isPressed);
  const me = useSelector((state) => state.user.username);
  const partner = useSelector((state) => state.user.anotherUser);
  const inputref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();
  console.log(me);
  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [dispatch]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function gettingMessages() {
      try {
        const response = await GetMessages(me, partner);
        if (response.success && response.result) {
          setMessages(response.result.messages);
        } else {
          setMessages([]);
        }
      } catch (err) {
        setMessages([]);
      }
    }
    gettingMessages();
  }, [me, partner]);

  function handleOpenProfile() {
    navigate(`/user/${partner}`);
  }

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  function handleMore() {
    dispatch(uiActions.changeIsMore());
  }
  async function handleSending(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.message) {
      await SendMessage(me, partner, data.message);
      inputref.current.value = "";
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: me,
          receiver: partner,
          message: data.message,
          timestamp: new Date().toISOString().slice(11, 16),
        },
      ]);
      socket.emit("sending-message", {
        sender: me,
        receiver: partner,
        message: data.message,
      });
    }

    // if (data.message) {
    //   socket.emit("sending-message", data.message);
    //   dispatch(messageActions.addMessage(data.message));
    //   inputref.current.value = "";
    // }
  }

  return (
    <div className={style.Chat}>
      {isPressed && partner && (
        <>
          <header className={style.chatName}>
            <div className={style.groupInfo}>
              <img className={style.chatPicture} src={picture} />
              <button onClick={handleOpenProfile} className={style.nickButton}>
                {partner}
              </button>
            </div>
            <div className={style.groupSettings}>
              <i className="bi bi-search"></i>
              <i onClick={handleMore} className="bi bi-three-dots-vertical"></i>
            </div>
          </header>
          <div className={style.chatDiv}>
            <ul className={style.chatMessages}>
              {messages.map((message, index) => {
                return (
                  <li key={index}>
                    <div>
                      <img src={tempPicture} />
                    </div>
                    <div>
                      <h4>{message.sender}</h4>
                      <h5>{message.message}</h5>
                    </div>
                    <div>{message.timestamp}</div>
                  </li>
                );
              })}
            </ul>
            <div ref={messagesEndRef} />
          </div>
          <footer className={style.sendingMessage}>
            <form onSubmit={handleSending}>
              <input
                autoComplete="off"
                ref={inputref}
                name="message"
                placeholder="Write a message..."
              />
            </form>
          </footer>
        </>
      )}
    </div>
  );
}
