import tempPicture from "../assets/tempPicture.png";
const dummy_array = [
  {
    name: "Bessie Cooper",
    picture: tempPicture,
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda consequuntur obcaecati delectus alias iusto totam blanditiis laborum ad modi ratione. Reprehenderit illo unde eveniet quas, alias minus voluptas atque accusantium.",
    id: 1234,
  },
];

export default function Chats() {
  return (
    <div className="Chats">
      <div className="top">
        <h1 className="text">Messages</h1>
        <form className="searchInput">
          <input name="search" placeholder="Search..." type="text" />
        </form>
      </div>
      <div className="messageChats">
        <ul className="listOfChats">
          {dummy_array.map((person) => {
            return (
              <button className="chat" key={person.id}>
                <div className="imageContainer">
                  <img src={person.picture} />
                </div>
                <div className="infoContainer">
                  <h4 className="name">{person.name}</h4>
                  <h6 className="last-message">{person.message}</h6>
                </div>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
