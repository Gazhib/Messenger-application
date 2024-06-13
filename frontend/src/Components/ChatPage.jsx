import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import searchLogo from "../assets/search.png";
import moreLogo from "../assets/more.png";
import { useDispatch, useSelector } from "react-redux";
import { moreActions, messageActions } from "../store/index.js";

export default function ChatPage() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.addMessage.meMessage);
  console.log(messages)
  function handleMore() {
    dispatch(moreActions.changeIsMore());
  }
  function handleSending(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data.message)
    dispatch(messageActions.sendMessage(data.message));
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
          <input name="message" placeholder="Write a message..." />
        </form>
      </footer>
    </div>
  );
}
