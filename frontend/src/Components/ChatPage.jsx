import tempPicture from "../assets/tempPicture.png";
import picture from "../assets/tempPicture.png";
import searchLogo from "../assets/search.png";
import moreLogo from "../assets/more.png";
const dummy_array = [
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Salam",
    id: 1237,
  },
  {
    name: "Alisher",
    picture: tempPicture,
    message: "Salam popalam",
    id: 1236,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Smotri prikol",
    id: 1235,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur obcaecati delectus alias iusto totam blanditiis laborum ad modi ratione. Reprehenderit illo unde eveniet quas, alias minus voluptas atque accusantium.",
    id: 1234,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Salam",
    id: 1237,
  },
  {
    name: "Alisher",
    picture: tempPicture,
    message: "Salam popalam",
    id: 1236,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Smotri prikol",
    id: 1235,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur obcaecati delectus alias iusto totam blanditiis laborum ad modi ratione. Reprehenderit illo unde eveniet quas, alias minus voluptas atque accusantium.",
    id: 1234,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Salam",
    id: 1237,
  },
  {
    name: "Alisher",
    picture: tempPicture,
    message: "Salam popalam",
    id: 1236,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message: "Smotri prikol",
    id: 1235,
  },
  {
    name: "Batyrlan",
    picture: tempPicture,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur obcaecati delectus alias iusto totam blanditiis laborum ad modi ratione. Reprehenderit illo unde eveniet quas, alias minus voluptas atque accusantium.",
    id: 1234,
  },
];
export default function ChatPage() {
  return (
    <div className="ChatPage">
      <header className="chatName">
        <div className="groupInfo">
          <img className="chatPicture" src={picture} />
          GroupName
        </div>
        <div className="groupSettings">
          <img alt="Search in chat..." src={searchLogo} />
          <img alt="About group" src={moreLogo} />
        </div>
      </header>
      <div className="chatDiv">
        <ul className="chatMessages">
          {dummy_array.map((message) => {
            return (
              <li key={message.id}>
                <div>
                  <img src={message.picture} />
                </div>
                <div>
                  <h4>{message.name}</h4>
                  <h5>{message.message}</h5>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <footer className="sendingMessage">
        <input placeholder="Write a message..." />
      </footer>
    </div>
  );
}
