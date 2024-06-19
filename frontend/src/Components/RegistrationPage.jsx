import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useState } from "react";
import { CreateAccount } from "../fetching";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function RegistrationPage() {
  const [text, setText] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
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

      const { success } = await CreateAccount(userData);

      if (!success) {
        setText("The username is already in use");
        return;
      }

      dispatch(authActions.changeAuth());
      navigate("/");
      setText(null);
    }
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
          <Link to="/login" style={{ color: "inherit" }}>
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
