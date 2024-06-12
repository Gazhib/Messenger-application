import tempPicture from "../assets/tempPicture.png";
const photos = [
  tempPicture,
  tempPicture,
  tempPicture,
  tempPicture,
  tempPicture,
  tempPicture,
  tempPicture,
  tempPicture,
];
export default function AboutGroup() {
  return (
    <div className="AboutGroup">
      <div className="groupPictureDiv">
        <img className="chatPicture Settings" src={tempPicture} />
      </div>
      <div>
        <h4>Tilters</h4>
        <h6>11 members</h6>
      </div>
      <div>
        <button className="addMembersButton">+Add members</button>
      </div>
      <div className="groupGallery">
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
