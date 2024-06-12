import AboutGroup from "./Components/AboutGroup";
import ChatPage from "./Components/ChatPage";
import Chats from "./Components/Chats";
import Sidebar from "./Components/Sidebar";
import { useSelector } from "react-redux";
function App() {
  const isMore = useSelector((state) => state.more.isMore);
  return (
    <div className="App">
      <Sidebar />
      <Chats />
      <ChatPage />
      {isMore && <AboutGroup />}
    </div>
  );
}

export default App;
