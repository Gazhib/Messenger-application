import style from "./Chats.module.css";
import temp from "../assets/blankPP.png";
import { GetUserInformation, SearchUsers } from "../fetching";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, userActions } from "../store";
export default function Chats() {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [friendsList, setFriendsList] = useState([]);
  const me = useSelector((state) => state.user.username);
  useEffect(() => {
    async function getFriends() {
      const response = await GetUserInformation(me);
      const friends = response.friends;
      setFriendsList(friends);
    }
    getFriends();
  }, [me]);

  useEffect(() => {

  })

  async function handleSearch(event) {
    event.preventDefault();
    const typed = event.target.value;
    const users = await SearchUsers(typed);
    setUserList(users);
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
          {inputRef.current && inputRef.current.value && userList.map((person) => {
            return (
              <button
                onClick={() => handleOpenChat(person.username)}
                className={style.chat}
                key={person._id}
              >
                <div className={style.imageContainer}>
                  <img src={temp} />
                </div>
                <div className={style.infoContainer}>
                  <h4 className={style.name}>{person.username}</h4>
                  <h6 className={style.last_message}>{person.message}</h6>
                </div>
              </button>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
