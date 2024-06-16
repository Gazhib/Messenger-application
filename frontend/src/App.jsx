import { useRef } from "react";
import AboutGroup from "./Components/AboutGroup";
import ChatPage from "./Components/ChatPage";
import Chats from "./Components/Chats";
import RegistrationModal from "./Components/RegistrationModal";
import Sidebar from "./Components/Sidebar";
import { useSelector } from "react-redux";
function App() {
  const ref = useRef();
  function handleClicking() {
    ref.current.open();
  }
  const isMore = useSelector((state) => state.more.isMore);
  return (
    <>
      <div className="App">
        <Sidebar handleClicking={handleClicking} />
        <Chats />
        <ChatPage />
        {isMore && <AboutGroup />}
      </div>
      <RegistrationModal ref={ref} />
    </>
  );
}

export default App;
