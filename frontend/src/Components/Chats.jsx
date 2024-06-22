import style from "./Chats.module.css";
import temp from "../assets/blankPP.png";
import { GetUserInformation, SearchUsers } from "../fetching";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function Chats() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  async function handleSearch(event) {
    event.preventDefault();
    const typed = event.target.value;
    const users = await SearchUsers(typed);
    setUserList(users);
  }

  async function handleOpenProfile(user) {
    const userInfo = await GetUserInformation(user);
    console.log(userInfo);
    navigate(`/user/${userInfo.username}`);
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
          />
        </form>
      </div>
      <div className={style.messageChats}>
        <ul className={style.listOfChats}>
          {userList.map((person) => {
            return (
              <button
                onClick={() => handleOpenProfile(person.username)}
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
