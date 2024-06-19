import logo from "../assets/logo.png";
import { authActions } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import style from "./Sidebar.module.css";
export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(authActions.changeAuth());
    navigate("/registration");
  }

  return (
    <>
      <aside className={style.Sidebar}>
        <div className={style.firstRow}>
          <img className={style.logo} src={logo} />
        </div>
        <div className={style.secondRow}></div>
        <div className={style.thirdRow}>
          <i onClick={handleLogout} className="bi bi-box-arrow-right icon"></i>
        </div>
      </aside>
    </>
  );
}
