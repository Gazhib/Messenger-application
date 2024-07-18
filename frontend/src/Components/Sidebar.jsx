/* eslint-disable react/prop-types */
import logo from "../assets/logo.png";
import profilePicture from "../assets/blankPP.png";
import { authActions, userActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import style from "./Sidebar.module.css";
export default function Sidebar({ me }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isConnected);
  function handleLogout() {
    navigate("/auth?mode=login");
    dispatch(authActions.changeAuth(false));
    localStorage.clear("username");
    dispatch(userActions.clearUserData());
  }
  function handleLogo() {
    navigate(`${me}`);
  }
  function handleProfile() {
    navigate(`user/${me}`);
  }
  return (
    <>
      <aside className={style.Sidebar}>
        <div className={style.firstRow}>
          {isAuth && (
            <img
              onClick={handleProfile}
              className={style.logo}
              src={profilePicture}
            />
          )}
          <img onClick={handleLogo} className={style.logo} src={logo} />
        </div>
        <div className={style.secondRow}></div>
        <div className={style.thirdRow}>
          <i onClick={handleLogout} className="bi bi-box-arrow-right icon"></i>
        </div>
      </aside>
    </>
  );
}
