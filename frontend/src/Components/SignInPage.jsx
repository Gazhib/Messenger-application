import { useDispatch, useSelector } from "react-redux";
import { authActions, userActions, uiActions } from "../store";
import { useState } from "react";
import { Login } from "../fetching";
import { Link, useNavigate } from "react-router-dom";
import { GetUserInformation } from "../fetching.js";
export default function SignInPage() {
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kal = useSelector((state) => state.user.username);
  async function handleLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const userData = { username: data.username, password: data.password };
    const info = await Login(userData);
    if (info.success) {
      dispatch(authActions.changeAuth(true));
      const userInfo = await GetUserInformation(data.username);
      const fuckingUsername = data.username;
      dispatch(userActions.getUsername({ fuckingUsername }));
      dispatch(userActions.getFriends(userInfo.friends));
      navigate("/");
      setText(null);
    } else {
      setText(info.message);
    }
  }

  function handleChange() {
    dispatch(uiActions.changeLogginIn("registration"));
  }

  return (
    <div className="RegistrationPage">
      <h1>Welcome to a Messaging Application</h1>
      <p className="title">
        <span>Signal</span>Chat
      </p>
      <div className="modal">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <Link
            onClick={handleChange}
            to="/registration"
            style={{ color: "inherit" }}
          >
            <h3>You want to create an account?</h3>
          </Link>
          <div>
            <input placeholder="username" name="username" />
          </div>
          <div>
            <input type="password" placeholder="password" name="password" />
          </div>
          {text && <p className="modalError">{text}</p>}
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
