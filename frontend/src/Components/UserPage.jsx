import { useNavigate, useParams } from "react-router";
import blankPicture from "../assets/blankPP.png";
import { Fetching } from "../fetching";
import style from "./UserPage.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function UserPage() {
  const myUsername = useSelector((state) => state.user.username);
  const { username } = useParams();
  const [isMe, setIsMe] = useState(false);
  const [friends, setFriends] = useState([]);
  const [isInFriends, setIsInFriends] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsMe(username === myUsername);
    async function getFriends() {
      const temp = await Fetching("get-user-information", { username });
      const myTemp = await Fetching("get-user-information", {
        username: myUsername,
      });
      const friendsTemp = myTemp.info.friends.some(
        (friend) => friend === username
      );
      setIsInFriends(friendsTemp);
      setFriends(temp.info.friends);
    }
    getFriends();
  }, [username, myUsername]);
  function handleRemove() {}

  function handleOpenProfile(partner) {
    navigate(`/user/${partner}`);
  }

  async function handleAdd() {
    const response = await Fetching("add-friend", {
      username: myUsername,
      friend: username,
    });
    console.log(response);
    if (response.info.success) {
      console.log("Successfully added a friend brotha");
    } else {
      console.log("Capec ty tupoi");
    }
  }

  return (
    <div className={style.UserPage}>
      <div className={style.leftSide}>
        <div className={style.profilePictureContainer}>
          <p className={style.username}>{username}</p>
          <img className={style.profilePicture} src={blankPicture} />
        </div>
        {!isMe ? (
          <div className={style.buttonContainer}>
            <button
              onClick={handleAdd}
              className={`${style.button} ${style.add}`}
              style={
                isInFriends
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "#61dafb" }
              }
            >
              {isInFriends ? "You are already friends, duh" : "Add a friend"}
            </button>
            <button
              onClick={handleRemove}
              className={`${style.button} ${style.block}`}
            >
              Block user
            </button>
          </div>
        ) : (
          <div>That is you bruh</div>
        )}
      </div>
      <div className={style.rightSide}>
        <div>
          {friends.length === 0 ? (
            <p>Bruh, have no friends. Bruh should touch some grass</p>
          ) : (
            <ul>
              {friends.map((friend, index) => {
                return (
                  <li key={index}>
                    <img
                      onClick={() => handleOpenProfile(friend)}
                      src={blankPicture}
                      className={`${style.profilePicture} ${style.friend}`}
                    />
                    <h4>{friend}</h4>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
