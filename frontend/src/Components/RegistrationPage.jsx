import { useDispatch } from "react-redux";
import { authActions, uiActions, userActions } from "../store";
import { useState } from "react";
import { Fetching } from "../fetching";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function RegistrationPage() {
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(uiActions.changeIsPressed(false));
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    if (data.password != data.confirmPassword) {
      setText("Your passwords are not matching");
    } else if (
      data.password === "" ||
      data.confirmPassword === "" ||
      data.username === ""
    ) {
      setText("Please fill out all the data");
    } else {
      const userData = { username: data.username, password: data.password };
      const { success } = await Fetching("create-account", userData);

      if (!success) {
        setText("The username is already in use");
        return;
      }
      dispatch(userActions.getUsername(data.username));
      dispatch(userActions.getFriends([]));

      dispatch(authActions.changeAuth(true));
      navigate("/");
      setText(null);
    }
  }

  function handleChange() {
    dispatch(uiActions.changeLogginIn("login"));
  }

  return (
    <div className="RegistrationPage">
      <h1>Welcome to a Messaging Application</h1>
      <p className="title">
        <span>Signal</span>Chat
      </p>
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Link onClick={handleChange} to="/" style={{ color: "inherit" }}>
            <h3>Do you already have an account?</h3>
          </Link>
          <div>
            <input placeholder="username" name="username" />
          </div>
          <div>
            <input type="password" placeholder="password" name="password" />
          </div>
          <div>
            <input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
            />
          </div>
          {text && <p className="modalError">{text}</p>}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
