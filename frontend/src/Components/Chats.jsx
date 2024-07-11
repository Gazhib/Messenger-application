/* eslint-disable react/prop-types */
import style from "./Chats.module.css";
import temp from "../assets/blankPP.png";
import { Fetching } from "../fetching";
import { useEffect, useState } from "react";
export default function Chats({ me, handleOpenChat, inputRef }) {
  const [userList, setUserList] = useState([]);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    async function getFriendsAndChats() {
      const chatResponse = await Fetching("get-chats", { sender: me });
      const chats = chatResponse.info.chats;
      if (chats) {
        setUserList(chats);
        setChats(chats);
      }
    }

    getFriendsAndChats();
  }, [me]);

  async function handleSearch(event) {
    event.preventDefault();
    const typed = event.target.value;
    const users = await Fetching("search-users", { typed });
    setUserList(users.info.users);
    if (event.target.value === "") {
      setUserList(chats);
    }
  }

  return (
    <div className={style.Chats}>
      <div className={style.top}>
        <h1 className={style.text}>Users</h1>
        <form className={style.searchInput}>
          <input
            onChange={handleSearch}
            name="search"
            placeholder="Search..."
            type="text"
            ref={inputRef}
          />
        </form>
      </div>
      <div className={style.messageChats}>
        <ul className={style.listOfChats}>
          {userList.map((person) => {
            return (
              <button
                onClick={() => handleOpenChat(person.username || person[0])}
                className={style.chat}
                key={person.username || person[0]}
              >
                <div className={style.imageContainer}>
                  <img src={temp} />
                </div>
                <div className={style.infoContainer}>
                  <div className={style.name}>
                    <h4>{person.username || person[0]} </h4>
                    <span className={style.timestamp}>
                      {person[1] && person[1].timestamp}
                    </span>
                  </div>
                  <h6 className={style.last_message}>
                    {person[1] && person[1].message}
                  </h6>
                </div>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
