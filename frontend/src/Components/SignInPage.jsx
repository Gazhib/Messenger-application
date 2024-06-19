import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useState } from "react";
import { Login } from "../fetching";
import { Link, useNavigate } from "react-router-dom";
export default function SignInPage() {
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const userData = { username: data.username, password: data.password };
    const info = await Login(userData);
    console.log(info);
    if (info.success) {
      console.log(info.message);
      dispatch(authActions.changeAuth());
      navigate("/");
      setText(null);
    } else {
      console.log(info.message);
      setText(info.message);
    }
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
          <Link to="/registration" style={{ color: "inherit" }}>
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
