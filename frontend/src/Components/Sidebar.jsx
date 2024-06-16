import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
export default function Sidebar({ handleClicking }) {
  return (
    <>
      <aside className="Sidebar">
        <div className="firstRow">
          <img className="logo" src={logo} />
        </div>
        <div className="secondRow">asd</div>
        <div className="thirdRow">
          <img onClick={handleClicking} src={logout}></img>
        </div>
      </aside>
    </>
  );
}
