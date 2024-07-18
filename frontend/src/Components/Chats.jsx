/* eslint-disable react/prop-types */
import style from "./Chats.module.css";
import temp from "../assets/blankPP.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Chats({ handleOpenChat, inputRef, handleSearch }) {
  const userList = useSelector((state) => state.user.chats);
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
              <NavLink
                to={`chat/${person.username || person[0]}`}
                onClick={() => handleOpenChat(person.username || person[0])}
                className={({ isActive }) =>
                  isActive ? `${style.active}` : undefined
                }
                end
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
              </NavLink>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
