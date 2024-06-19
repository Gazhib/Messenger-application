import blankPicture from "../assets/blankPP.png";
import style from "./UserPage.module.css";
const friends = [1, 1, 1, 1, 1, 1, 1, 1];
export default function userPage() {
  return (
    <div className={style.UserPage}>
      <div className={style.leftSide}>
        <div className={style.profilePictureContainer}>
          <img className={style.profilePicture} src={blankPicture} />
        </div>
        <div className={style.buttonContainer}>
          <button className={`${style.button} ${style.add}`}>
            Add a friend
          </button>
          <button className={`${style.button} ${style.block}`}>
            Block user
          </button>
        </div>
      </div>
      <div className={style.rightSide}>
        <div>
          {friends.length === 0 ? (
            <p>You, bruh, have no friends. Go touch some grass</p>
          ) : (
            <ul>
              {friends.map((friend, index) => {
                return (
                  <li key={index}>
                    <img
                      src={blankPicture}
                      className={`${style.profilePicture} ${style.friend}`}
                    />
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
