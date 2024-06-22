import Sidebar from "./Sidebar";
import Chats from "./Chats";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import AboutGroup from "./AboutGroup";
import { useEffect } from "react";
export default function ChatPage() {
  const isMore = useSelector((state) => state.ui.isMore);
  useEffect(() => {
    console.log("Chat component mounted or updated");
  }, []);

  return (
    <div className="App">
      <Sidebar />
      <Chats />
      <Chat />
      {isMore && <AboutGroup />}
    </div>
  );
}
