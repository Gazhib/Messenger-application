/* eslint-disable react/prop-types */
import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import { useDispatch, useSelector } from "react-redux";
import { messageActions, uiActions, userActions } from "../store/index.js";
import { useEffect, useRef } from "react";
import style from "./Chat.module.css";
import {
  useNavigate,
  useParams,
  Form,
  useLoaderData,
  useActionData,
} from "react-router-dom";
import { Fetching } from "../fetching.js";
export default function Chat() {
  const isPressed = useSelector((state) => state.ui.isPressed);
  const username = localStorage.getItem("username");
  const { partner } = useParams();
  const inputref = useRef();
  const initialMessages = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef();
  const messages = useSelector((state) => state.addMessage.messages);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  function handleOpenProfile() {
    navigate(`/user/${partner}`);
  }

  function handleMore() {
    dispatch(uiActions.changeIsMore());
  }

  useEffect(() => {
    dispatch(messageActions.initialMessages(initialMessages));
  }, [initialMessages, dispatch]);

  const lastMessage = useActionData();

  useEffect(() => {
    async function getFriendsAndChats() {
      const chatResponse = await Fetching("get-chats", { sender: username });
      const chats = chatResponse.info.chats;
      if (chats) {
        dispatch(userActions.getChats(chats));
      }
    }

    if (lastMessage) {
      dispatch(messageActions.addMessage(lastMessage));
      getFriendsAndChats();
      inputref.current.value = "";
    }
  }, [lastMessage, dispatch, username]);
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
              {messages &&
                messages.map((message, index) => {
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
            <Form method="post">
              <input
                autoComplete="off"
                ref={inputref}
                name="message"
                placeholder="Write a message..."
              />
            </Form>
          </footer>
        </>
      )}
    </div>
  );
}
