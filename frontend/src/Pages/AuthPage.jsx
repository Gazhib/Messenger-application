import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions, authActions, userActions, messageActions } from "../store";
import { useState } from "react";
import AuthForm from "../Components/AuthForm";
import { Fetching } from "../fetching";
export default function Auth() {
  const [text, setText] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const regText = {
    title: "Register",
    suggestion: "Do you already have an account?",
    buttonText: "Submit",
  };

  const logText = {
    title: "Sign In",
    suggestion: "You want to create an account?",
    buttonText: "Login",
  };

  async function handleLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const userData = { username: data.username, password: data.password };
    dispatch(uiActions.changeIsPressed(false));
    const info = await Fetching("login", userData);
    if (info.success) {
      dispatch(authActions.changeAuth(true));
      const userInfo = await Fetching("get-user-information", {
        username: data.username,
      });
      dispatch(userActions.getUsername(data.username));

      dispatch(userActions.getFriends(userInfo.friends));
      localStorage.setItem("username", data.username);
      navigate(`/${data.username}/`);
      setText(null);
    } else {
      setText(info.message);
    }
  }

  async function handleRegistration(event) {
    event.preventDefault();
    dispatch(uiActions.changeIsPressed(false));
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const userData = {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const { success, message } = await Fetching("create-account", userData);

    if (!success && message) {
      const messageList = message.split(",");
      const displayMessages = messageList.join("\n");
      setText(displayMessages);
      return;
    }

    dispatch(userActions.getUsername(data.username));
    localStorage.setItem("username", data.username);
    dispatch(authActions.changeAuth(true));
    navigate(`/${data.username}/`);
    setText(null);
  }

  return (
    <AuthForm
      handleAuth={isLogin ? handleLogin : handleRegistration}
      text={text}
      dataText={isLogin ? logText : regText}
      isLogin={isLogin}
    />
  );
}
