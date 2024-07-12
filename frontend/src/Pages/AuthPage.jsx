import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions, authActions, userActions } from "../store";
import { useState } from "react";
import AuthForm from "../Components/AuthForm";
import { Fetching } from "../fetching";
export default function Auth() {
  const [text, setText] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const regLog = useSelector((state) => state.ui.regLog);
  console.log(regLog);

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

      dispatch(authActions.changeAuth(true));
      navigate(`/${data.username}/`);
      setText(null);
    }
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
