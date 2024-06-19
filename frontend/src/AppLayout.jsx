import { useSelector } from "react-redux";
import Sidebar from "./Components/Sidebar";
import Chats from "./Components/Chats";
import Chat from "./Components/Chat";
import AboutGroup from "./Components/AboutGroup";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const isMore = useSelector((state) => state.more.isMore);
  const isAuth = useSelector((state) => state.auth.isConnected);

  return (
    <>
      {isAuth ? (
        <div className="App">
          <Sidebar />
          <Chats />
          <Chat />
          {isMore && <AboutGroup />}
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default AppLayout;
