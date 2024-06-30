import style from "./Chats.module.css";
import temp from "../assets/blankPP.png";
import { GetChats, SearchUsers } from "../fetching";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, userActions } from "../store";
export default function Chats() {
  const [userList, setUserList] = useState([]);
  const [chats, setChats] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const me = useSelector((state) => state.user.username);
  useEffect(() => {
    async function getFriendsAndChats() {
      const chatResponse = await GetChats(me);
      const chats = chatResponse.result.chats;
      console.log(chats);
      setUserList(chats);
      setChats(chats);
    }

    getFriendsAndChats();
  }, [me]);

  useEffect(() => {});

  async function handleSearch(event) {
    event.preventDefault();
    const typed = event.target.value;
    const users = await SearchUsers(typed);
    setUserList(users);
    if (event.target.value === "") {
      setUserList(chats);
    }
  }

  async function handleOpenChat(user) {
    dispatch(userActions.getAnotherUser(user));
    dispatch(uiActions.changeIsPressed(true));
    inputRef.current.value = "";
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
                key={person._id}
              >
                <div className={style.imageContainer}>
                  <img src={temp} />
                </div>
                <div className={style.infoContainer}>
                  <div className={style.name}>
                    <h4>{person.username || person[0]} </h4>
                    <span className={style.timestamp}>
                      {person[1].timestamp && person[1].timestamp}
                    </span>
                  </div>
                  <h6 className={style.last_message}>{person[1].message}</h6>
                </div>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
