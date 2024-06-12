import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
export default function Sidebar() {
  return (
    <aside className="Sidebar">
      <div className="firstRow">
        <img className="logo" src={logo} />
      </div>
      <div className="secondRow">asd</div>
      <div className="thirdRow">
        <img src={logout}></img>
      </div>
    </aside>
  );
}
