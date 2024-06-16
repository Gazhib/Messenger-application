import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import searchLogo from "../assets/search.png";
import moreLogo from "../assets/more.png";
import { useDispatch, useSelector } from "react-redux";
import { moreActions, messageActions } from "../store/index.js";
import { socket } from "../socket.js";
import { useEffect, useRef } from "react";
export default function ChatPage() {
  const inputref = useRef();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.addMessage.meMessage);
  console.log(messages);
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
    dispatch(moreActions.changeIsMore());
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
    <div className="ChatPage">
      <header className="chatName">
        <div className="groupInfo">
          <img className="chatPicture" src={picture} />
          GroupName
        </div>
        <div className="groupSettings">
          <img alt="Search in chat..." src={searchLogo} />
          <img onClick={handleMore} alt="About group" src={moreLogo} />
        </div>
      </header>
      <div className="chatDiv">
        <ul className="chatMessages">
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
      <footer className="sendingMessage">
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
