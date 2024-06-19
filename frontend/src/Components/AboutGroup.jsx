import tempPicture from "../assets/tempPicture.png";
import style from "./AboutGroup.module.css";
const photos = [tempPicture];
export default function AboutGroup() {
  return (
    <div className={style.AboutGroup}>
      <div className={style.groupPictureDiv}>
        <img
          className={`${style.chatPicture} ${style.Settings}`}
          src={tempPicture}
        />
      </div>
      <div>
        <h4>Tilters</h4>
        <h6>11 members</h6>
      </div>
      <div>
        <button className={style.addMembersButton}>+Add members</button>
      </div>
      <div className={style.groupGallery}>
        <ul>
          {photos.map((photo, index) => {
            return (
              <li key={index}>
                <img src={photo} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
