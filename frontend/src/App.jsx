import ChatPage from "./Components/ChatPage";
import Chats from "./Components/Chats";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Chats />
      <ChatPage />
    </div>
  );
}

export default App;
