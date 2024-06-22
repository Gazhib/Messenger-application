import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, messageActions } from "../store/index.js";
import { socket } from "../socket.js";
import { useEffect, useRef } from "react";
import style from "./Chat.module.css";
export default function Chat() {
  const inputref = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.addMessage.meMessage);
  useEffect(() => {
    const handleNewMessage = (message) => {
      dispatch(messageActions.addMessage(message));
    };

    socket.on("receive-message", handleNewMessage);

    return () => {
      socket.off("receive-message", handleNewMessage);
    };
  }, [dispatch]);
  function handleMore() {
    dispatch(uiActions.changeIsMore());
  }
  function handleSending(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.message) {
      socket.emit("sending-message", data.message);
      dispatch(messageActions.addMessage(data.message));
      inputref.current.value = "";
    }
  }

  return (
    <div className={style.Chat}>
      <header className={style.chatName}>
        <div className={style.groupInfo}>
          <img className={style.chatPicture} src={picture} />
          GroupName
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
                  <h4>Me</h4>
                  <h5>{message}</h5>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <footer className={style.sendingMessage}>
        <form onSubmit={handleSending}>
          <input
            ref={inputref}
            name="message"
            placeholder="Write a message..."
          />
        </form>
      </footer>
    </div>
  );
}
