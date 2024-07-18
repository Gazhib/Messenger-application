/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
export default function AuthForm({ handleAuth, text, dataText, isLogin }) {
  return (
    <div className="RegistrationPage">
      <h1>Welcome to a Messaging Application</h1>
      <p className="title">
        <span>Signal</span>Chat
      </p>
      <div className="modal">
        <form onSubmit={handleAuth}>
          <h1>{dataText && dataText.title}</h1>
          <Link
            to={`/auth?mode=${isLogin ? "registration" : "login"}`}
            style={{ color: "inherit" }}
          >
            <h3>{dataText && dataText.suggestion}</h3>
          </Link>
          <div>
            <input placeholder="username" name="username" />
          </div>
          <div>
            <input type="password" placeholder="password" name="password" />
          </div>
          {dataText.title === "Register" && (
            <div>
              <input
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
              />
            </div>
          )}
          {dataText.title === "Register" &&
            text &&
            text.split("\n").map((line, index) => (
              <p className="modalError" key={index}>
                {line}
              </p>
            ))}
          <button>{dataText && dataText.buttonText}</button>
        </form>
      </div>
    </div>
  );
}
