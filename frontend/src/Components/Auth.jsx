import { useSearchParams } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import SignInPage from "./SignInPage";
import { useDispatch } from "react-redux";
export default function Auth() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  return <>{isLogin ? <SignInPage /> : <RegistrationPage />}</>;
}


