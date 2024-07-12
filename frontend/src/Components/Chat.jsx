/* eslint-disable react/prop-types */
import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/index.js";
import { socket } from "../socket.js";
import { useEffect, useRef, useState } from "react";
import style from "./Chat.module.css";
import { Fetching } from "../fetching.js";
import { useLoaderData, useNavigate } from "react-router";
export default function Chat({ me }) {
  const isPressed = useSelector((state) => state.ui.isPressed);
  const partner = useSelector((state) => state.user.anotherUser);
  const inputref = useRef();
  const initialMessages = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef();
  useEffect(() => {
    const handleNewMessage = (message) => {
      if (
        (message.sender === me && message.receiver === partner) ||
        (message.sender === partner && message.receiver === me)
      ) {
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [dispatch, me, partner]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      await Fetching("send-message", {
        sender: me,
        receiver: partner,
        message: data.message,
      });
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
